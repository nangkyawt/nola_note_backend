import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    color: { type: String, default: "bg-white" },
    emoji: { type: String, default: "📝" },
    pinned: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    text: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
