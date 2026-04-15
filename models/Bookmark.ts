/**
 * Bookmark Mongoose Model
 *
 * Defines the MongoDB schema for bookmarked articles.
 * Each bookmark stores a snapshot of article metadata at the time of bookmarking.
 * The articleId field has a unique index to prevent duplicate bookmarks.
 *
 * Uses the "reuse existing model" pattern to avoid OverwriteModelError
 * during hot-reloads in development.
 */

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
  sourceUrl: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Unique index on articleId to prevent duplicate bookmarks for the same article
BookmarkSchema.index({ articleId: 1 }, { unique: true });

// Reuse existing model if already compiled (prevents hot-reload errors)
export default mongoose.models.Bookmark ||
  mongoose.model("Bookmark", BookmarkSchema);
