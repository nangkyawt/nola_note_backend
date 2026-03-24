import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import notesRouter from "./routes/notes.js";
// import Note from "./models/Note.js"; 
import authRouter from "./routes/auth.js";
// require('dotenv').config();


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Note schema with color, emoji, pinned, tags, text
// const noteSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     color: { type: String, default: "bg-white" },
//     emoji: { type: String, default: "📝" },
//     pinned: { type: Boolean, default: false },
//     tags: { type: [String], default: [] },
//     text: { type: String, default: "" },
//     createdAt: { type: Date, default: Date.now }
// });



// GET all notes
// app.get('/api/notes', async (req, res) => {
//     try {
//         const notes = await Note.find().sort({ createdAt: -1 });
//         res.json(notes);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch notes" });
//     }
// });

// app.post("/api/notes", async (req, res) => {
//   console.log("POST /notes body:", req.body);
//     try {
//         const { title, content, color, emoji, pinned, tags, text } = req.body;

//         const note = await Note.create({
//             title,
//             content,
//             color,
//             emoji,
//             pinned,
//             tags,
//             text
//         });

//         res.status(201).json(note);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Failed to create note" });
//     }
// });


// app.get('/api/notes', async (req, res) => {
//     try {
//         const notes = await Note.find().sort({ createdAt: -1 });
//         res.json(notes);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to fetch notes" });
//     }
// });

// Update note
// app.put("/api/notes/:id", async (req, res) => {
//   try {
//     const { title, content, color, emoji, pinned, tags, text } = req.body;

//     const updatedNote = await Note.findByIdAndUpdate(
//       req.params.id,
//       { title, content, color, emoji, pinned, tags, text },
//       { new: true } 
//     );

//     if (!updatedNote) {
//       return res.status(404).json({ error: "Note not found" });
//     }

//     res.json(updatedNote);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update note" });
//   }
// });

// Delete
// app.delete("/api/notes/:id", async (req, res) => {
//   try {
//     const deletedNote = await Note.findByIdAndDelete(req.params.id);

//     if (!deletedNote) {
//       return res.status(404).json({ error: "Note not found" });
//     }

//     res.json({ message: "Note deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete note" });
//   }
// });

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});