import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Note from '../models/Note';


const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});
const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    const notesWithColor = notes.map((note) => {
      const n = note.toObject();

      return {
        ...n,
        color: n.color || "bg-pink-100",
        emoji: n.emoji || "📝",
        pinned: n.pinned ?? false,
        tags: n.tags || []
      };
    });

    res.json(notesWithColor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// POST new note
router.post("/", async (req, res) => {
  console.log("POST /notes body:", req.body); // should include color
  try {
    const note = await Note.create(req.body); // send full body
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// DELETE note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// Update
router.patch("/:id/pin", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.pinned = !note.pinned;

    // skip validation for required fields
    await note.save({ validateBeforeSave: false });

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to toggle pin" });
  }
});

// PATCH pin toggle
router.patch('/:id/pin', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  note.pinned = !note.pinned;
  await note.save();
  res.json(note);
});

export default router;