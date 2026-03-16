import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  color: String,
  emoji: String,
  pinned: Boolean,
  tags: [String],
  text: String,
  createdAt: Date
});

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

const fixNotes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Update notes missing color
    const result = await Note.updateMany(
      { color: { $exists: false } },
      { $set: { color: "bg-white", emoji: "📝", pinned: false, tags: [], text: "" } }
    );

    console.log(`✅ Updated ${result.modifiedCount} notes`);
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

fixNotes();