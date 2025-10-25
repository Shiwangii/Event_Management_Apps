import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import eventRoutes from "./routes/eventRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/profiles", profileRoutes);
app.use("/api/events", eventRoutes);

// --------------------------
// 🚀 Serve Frontend in Production
// --------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend from client/dist
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Root route for quick check
app.get("/api", (req, res) => {
  res.send("Event Management API is running 🚀");
});

// --------------------------
// ✅ Start the server
// --------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
