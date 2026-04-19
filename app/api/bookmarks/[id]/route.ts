/**
 * Bookmark Delete API Route - /api/bookmarks/[id]
 *
 * Handles deletion of a specific bookmark by its MongoDB document ID.
 * Note: In Next.js 16, dynamic route params are Promises and must be awaited.
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

// DELETE /api/bookmarks/[id] - Remove a bookmark by its MongoDB _id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required", message: "Please log in to manage bookmarks." },
        { status: 401 }
      );
    }

    await connectDB();
    // Await params (required in Next.js 16 for dynamic route segments)
    const { id } = await params;

    const deleted = await Bookmark.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return NextResponse.json(
        { error: "Bookmark not found", message: "Bookmark does not exist or does not belong to the current user." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete bookmark", message: (error as Error).message },
      { status: 500 }
    );
  }
}
