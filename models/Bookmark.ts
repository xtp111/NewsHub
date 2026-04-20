// Member: Tianpeng Xu
// Bookmark Mongoose Model: MongoDB schema for bookmarked articles


import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
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
  sourceUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Each user can bookmark an article once, while different users can bookmark the same article.
BookmarkSchema.index({ userId: 1, articleId: 1 }, { unique: true });

// Reuse existing model if already compiled (prevents hot-reload errors)
export default mongoose.models.Bookmark ||
  mongoose.model("Bookmark", BookmarkSchema);
