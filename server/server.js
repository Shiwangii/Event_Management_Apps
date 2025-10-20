import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/profiles", profileRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => res.send("Event Management API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
