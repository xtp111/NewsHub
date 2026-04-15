import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BookmarkSchema.index({ articleId: 1 }, { unique: true });

export default mongoose.models.Bookmark ||
  mongoose.model("Bookmark", BookmarkSchema);
