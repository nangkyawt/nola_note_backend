import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// CREATE new note
router.post("/", async (req, res) => {
  console.log("POST /notes body:", req.body);
  try {
    const note = await Note.create(req.body); 
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// UPDATE note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ error: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;