// backend/models/Note.js
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    color: { type: String, default: "bg-white" }, 
    emoji: { type: String, default: "📝" },
    pinned: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    text: { type: String }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);

