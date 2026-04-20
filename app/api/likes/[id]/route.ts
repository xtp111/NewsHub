// Member: Tianpeng Xu
// API route for handling likes on an article (get count + toggle like/unlike)

import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Like from "@/models/Like";
import { ok, fail } from "@/lib/api/respond";

// GET /likes/[id] - returns like count and whether the article is liked (simplified flag)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to MongoDB
    await connectDB();
    // Extract article ID from route params
    const { id } = await params;
    // Get total like count for this article
    const count = await Like.countDocuments({ articleId: id });
    return ok({ count, hasLiked: count > 0 });
  } catch (error) {
    return fail(500, "Failed to get like count", (error as Error).message);
  }
}

// POST /likes/[id] - like or unlike an article
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to MongoDB
    await connectDB();
    // Extract article ID from route params
    const { id } = await params;
    // Parse action payload (like or unlike)
    const { action } = (await request.json()) as { action: "like" | "unlike" };

    // Handle like action (create if not exists)
    if (action === "like") {
      const existing = await Like.findOne({ articleId: id });
      if (!existing) await Like.create({ articleId: id });
    }
    // Handle unlike action (remove existing like)
    else if (action === "unlike") {
      await Like.deleteOne({ articleId: id });
    }

    // Recalculate updated like count
    const count = await Like.countDocuments({ articleId: id });
    return ok({ count, hasLiked: action === "like" });
  } catch (error) {
    return fail(500, "Operation failed", (error as Error).message);
  }
}
