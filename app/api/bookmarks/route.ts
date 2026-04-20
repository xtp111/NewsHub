// Member: Tianpeng Xu
// API routes for managing user bookmarks (fetching and creating)

import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";
import { ok, fail } from "@/lib/api/respond";

import { createClient } from "@/lib/supabase/server";

// API routes for managing user bookmarks (fetching and creating)

// Retrieves the currently authenticated Supabase user ID (or null if not logged in)
async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

// GET /bookmarks - returns all bookmarks for the authenticated user
export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) return fail(401, "Not authenticated");

    await connectDB();
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });

    return ok({ bookmarks });
  } catch (error) {
    return fail(500, "Failed to fetch bookmarks", (error as Error).message);
  }
}

// POST /bookmarks - creates a new bookmark for the authenticated user
export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) return fail(401, "Not authenticated");

    await connectDB();
    const body = await request.json();

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

    return ok({ bookmark }, 201);
  } catch (error) {
    return fail(500, "Failed to add bookmark", (error as Error).message);
  }
}
