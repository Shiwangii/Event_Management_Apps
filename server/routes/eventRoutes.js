import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// List all (optionally format for timezone in client)
router.get("/", async (req, res) => {
  const items = await Event.find().populate("profiles");
  res.json(items);
});

// Create
router.post("/", async (req, res) => {
  const { profiles, timezone, start, end } = req.body;
  if (!profiles?.length) return res.status(400).json({ error: "profiles required" });
  if (new Date(end) < new Date(start)) return res.status(400).json({ error: "end before start" });

  const ev = new Event({ profiles, timezone, start, end, changes: [{ field: "created", prev: null, next: { profiles, timezone, start, end } }] });
  await ev.save();
  const populated = await ev.populate("profiles");
  res.json(populated);
});

// Update with diffs
router.put("/:id", async (req, res) => {
  const ev = await Event.findById(req.params.id);
  if (!ev) return res.status(404).json({ error: "not found" });

  const fields = ["profiles", "timezone", "start", "end"];
  for (const f of fields) {
    if (req.body[f] !== undefined) {
      const prev = ev[f];
      ev[f] = req.body[f];
      ev.changes.push({ field: f, prev, next: req.body[f] });
    }
  }
  if (new Date(ev.end) < new Date(ev.start)) return res.status(400).json({ error: "end before start" });

  await ev.save();
  const populated = await ev.populate("profiles");
  res.json(populated);
});

export default router;
