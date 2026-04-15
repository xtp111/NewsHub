/**
 * Likes API Route - /api/likes/[id]
 *
 * Handles like/unlike operations for articles using MongoDB.
 * The [id] parameter is the article's base64url-encoded ID.
 * - GET:  Returns the current like count for an article
 * - POST: Likes or unlikes an article based on the "action" field in the request body
 *
 * Note: In Next.js 16, dynamic route params are Promises and must be awaited.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Like from "@/models/Like";

// GET /api/likes/[id] - Retrieve the like count for a specific article
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Count total likes for this article
    const count = await Like.countDocuments({ articleId: id });
    // hasLiked is always false on GET since there's no user session tracking likes
    const hasLiked = false;

    return NextResponse.json({ count, hasLiked });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get like count", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/likes/[id] - Toggle like status for an article
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const { action } = body as { action: "like" | "unlike" };

    if (action === "like") {
      // Prevent duplicate likes for the same article
      const existing = await Like.findOne({ articleId: id });
      if (existing) {
        return NextResponse.json(
          { error: "Already liked" },
          { status: 400 }
        );
      }
      await Like.create({ articleId: id });
    } else if (action === "unlike") {
      // Remove the like record for this article
      await Like.deleteOne({ articleId: id });
    }

    // Return the updated like count and current like status
    const count = await Like.countDocuments({ articleId: id });
    return NextResponse.json({ count, hasLiked: action === "like" });
  } catch (error) {
    return NextResponse.json(
      { error: "Operation failed", message: (error as Error).message },
      { status: 500 }
    );
  }
}
