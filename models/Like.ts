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

LikeSchema.index({ articleId: 1 }, { unique: true });

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);
