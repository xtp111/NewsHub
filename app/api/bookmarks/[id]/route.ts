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

// DELETE /api/bookmarks/[id] - Remove a bookmark by its MongoDB _id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    // Await params (required in Next.js 16 for dynamic route segments)
    const { id } = await params;

    const deleted = await Bookmark.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Bookmark not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete bookmark", message: (error as Error).message },
      { status: 500 }
    );
  }
}
