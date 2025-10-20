import mongoose from "mongoose";

const changeSchema = new mongoose.Schema(
  {
    field: String,            // "start", "end", "timezone", "profiles"
    prev: mongoose.Schema.Types.Mixed,
    next: mongoose.Schema.Types.Mixed,
    at: { type: Date, default: Date.now }, // UTC
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true }],
    timezone: { type: String, required: true },     // authoring timezone
    start: { type: Date, required: true },          // store in UTC
    end: { type: Date, required: true },            // store in UTC
    changes: [changeSchema],                        // update logs
  },
  { timestamps: true } // createdAt / updatedAt (UTC)
);

export default mongoose.model("Event", eventSchema);
