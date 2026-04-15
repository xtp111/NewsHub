/**
 * Bookmarks API Route - /api/bookmarks
 *
 * Handles bookmark CRUD operations using MongoDB.
 * - GET:  Retrieve all bookmarks, sorted by newest first
 * - POST: Save a new bookmark with article metadata
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";

// GET /api/bookmarks - Retrieve all saved bookmarks, sorted by creation date (newest first)
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

// POST /api/bookmarks - Create a new bookmark from the request body's article data
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Create a new Bookmark document with all relevant article fields
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

    return NextResponse.json({ bookmark }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add bookmark", message: (error as Error).message },
      { status: 500 }
    );
  }
}
