import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Like from "@/models/Like";

// GET /api/likes/[id] - Get like count for an article
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const count = await Like.countDocuments({ articleId: id });
    const hasLiked = false;

    return NextResponse.json({ count, hasLiked });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get like count", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/likes/[id] - Like or unlike an article
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
      const existing = await Like.findOne({ articleId: id });
      if (existing) {
        return NextResponse.json(
          { error: "Already liked" },
          { status: 400 }
        );
      }
      await Like.create({ articleId: id });
    } else if (action === "unlike") {
      await Like.deleteOne({ articleId: id });
    }

    const count = await Like.countDocuments({ articleId: id });
    return NextResponse.json({ count, hasLiked: action === "like" });
  } catch (error) {
    return NextResponse.json(
      { error: "Operation failed", message: (error as Error).message },
      { status: 500 }
    );
  }
}
