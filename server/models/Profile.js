import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timezone: { type: String, default: "UTC" }
});

export default mongoose.model("Profile", profileSchema);
