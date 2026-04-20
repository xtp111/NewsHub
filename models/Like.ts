// Member: Tianpeng Xu
// Bookmark Mongoose Model: MongoDB schema for article likes

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
