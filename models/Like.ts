/**
 * Like Mongoose Model
 *
 * Defines the MongoDB schema for article likes.
 * Each document represents a single like on an article.
 * The articleId field has a unique index, allowing only one like per article
 * (simplified model without per-user tracking).
 *
 * Uses the "reuse existing model" pattern to avoid OverwriteModelError
 * during hot-reloads in development.
 */

import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  articleId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Unique index on articleId (one like record per article)
LikeSchema.index({ articleId: 1 }, { unique: true });

// Reuse existing model if already compiled (prevents hot-reload errors)
export default mongoose.models.Like || mongoose.model("Like", LikeSchema);
