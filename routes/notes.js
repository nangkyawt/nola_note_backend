import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js"

const router = express.Router();

// GET notes (ONLY USER NOTES)
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// CREATE note (ATTACH USER)
router.post("/", auth, async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user.id, // Must be set
    });
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
});
// UPDATE
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 🔥 protect
      req.body,
      { new: true }
    );

    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;