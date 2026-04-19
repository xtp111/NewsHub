import type { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";
import { ok, fail } from "@/lib/api/respond";

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const deleted = await Bookmark.findByIdAndDelete(id);
    if (!deleted) return fail(404, "Bookmark not found");

    return ok({ message: "Deleted successfully" });
  } catch (error) {
    return fail(500, "Failed to delete bookmark", (error as Error).message);
  }
}

