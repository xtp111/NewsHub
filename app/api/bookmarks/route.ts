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
import { createClient } from "@/lib/supabase/server";

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

// GET /api/bookmarks - Retrieve all saved bookmarks, sorted by creation date (newest first)
export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json({ bookmarks: [] }, { status: 401 });
    }

    await connectDB();
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
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
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required", message: "Please log in to bookmark articles." },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();

    const existingBookmark = await Bookmark.findOne({
      userId,
      articleId: body.articleId,
    });

    if (existingBookmark) {
      return NextResponse.json(
        { bookmark: existingBookmark, alreadyExists: true },
        { status: 200 }
      );
    }

    // Create a new Bookmark document with all relevant article fields
    const bookmark = await Bookmark.create({
      userId,
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
    const err = error as Error & { code?: number };

    if (err.code === 11000) {
      return NextResponse.json(
        { error: "Bookmark already exists", message: "This article is already in your bookmarks." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add bookmark", message: err.message },
      { status: 500 }
    );
  }
}
