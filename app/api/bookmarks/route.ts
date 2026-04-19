import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";
import { ok, fail } from "@/lib/api/respond";

export async function GET() {
  try {
    await connectDB();
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    return ok({ bookmarks });
  } catch (error) {
    return fail(500, "Failed to fetch bookmarks", (error as Error).message);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const bookmark = await Bookmark.create({
      articleId: body.articleId,
      title: body.title,
      summary: body.summary,
      imageUrl: body.imageUrl,
      category: body.category,
      author: body.author,
      publishedAt: body.publishedAt,
      sourceUrl: body.sourceUrl,
    });
    return ok({ bookmark }, 201);
  } catch (error) {
    return fail(500, "Failed to add bookmark", (error as Error).message);
  }
}
