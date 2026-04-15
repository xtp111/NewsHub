import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";

// GET /api/bookmarks - Get all bookmarks
export async function GET() {
  try {
    await connectDB();
    const bookmarks = await Bookmark.find().sort({ createdAt: -1 });
    return NextResponse.json({ bookmarks });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookmarks", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/bookmarks - Add a bookmark
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
    });

    return NextResponse.json({ bookmark }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add bookmark", message: (error as Error).message },
      { status: 500 }
    );
  }
}
