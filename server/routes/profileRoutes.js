import express from "express";
import Profile from "../models/Profile.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, timezone } = req.body;
  const profile = new Profile({ name, timezone });
  await profile.save();
  res.json(profile);
});

router.get("/", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

export default router;
