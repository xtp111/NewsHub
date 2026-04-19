import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Like from "@/models/Like";
import { ok, fail } from "@/lib/api/respond";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const count = await Like.countDocuments({ articleId: id });
    return ok({ count, hasLiked: count > 0 });
  } catch (error) {
    return fail(500, "Failed to get like count", (error as Error).message);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const { action } = (await request.json()) as { action: "like" | "unlike" };

    if (action === "like") {
      const existing = await Like.findOne({ articleId: id });
      if (!existing) await Like.create({ articleId: id });
    } else if (action === "unlike") {
      await Like.deleteOne({ articleId: id });
    }

    const count = await Like.countDocuments({ articleId: id });
    return ok({ count, hasLiked: action === "like" });
  } catch (error) {
    return fail(500, "Operation failed", (error as Error).message);
  }
}
