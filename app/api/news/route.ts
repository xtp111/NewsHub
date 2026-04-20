// Member: Tianpeng Xu
// fetch articles by id, search query, or category

import type { NextRequest } from "next/server";
import type { Article } from "@/types";
import { fetchFromNewsAPI } from "@/lib/news/newsapi";
import { articleCache } from "@/lib/news/cache";
import { decodeArticleId } from "@/lib/news/articleId";
import { ok, fail } from "@/lib/api/respond";
import connectDB from "@/lib/mongodb";
import Bookmark from "@/models/Bookmark";

export async function GET(request: NextRequest) {
  // Parse query parameters from request URL
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const id = searchParams.get("id");

  // Case 1: Fetch single article by ID
  if (id) {
    // Check in-memory cache first
    const cached = articleCache.get(id);
    if (cached) return ok({ article: cached });
    // Fallback: hydrate from bookmark snapshot so bookmarked articles survive cache eviction
    await connectDB();
    const bookmark = await Bookmark.findOne({ articleId: id }).lean();
    if (bookmark) {
      const article: Article = {
        id,
        title: bookmark.title,
        summary: bookmark.summary,
        category: bookmark.category,
        author: bookmark.author,
        publishedAt: new Date(bookmark.publishedAt).toISOString(),
        imageUrl: bookmark.imageUrl || undefined,
        sourceUrl: bookmark.sourceUrl || decodeArticleId(id),
      };
      articleCache.set(id, article);
      return ok({ article });
    }
    // Last resort: reconstruct article from encoded URL if not cached and not bookmarked
    try {
      const sourceUrl = decodeArticleId(id);
      const stub: Article = {
        id,
        title: "Article",
        summary: "This article is no longer in the cache.",
        content: "Visit the original source to read the full article.",
        category: "General",
        author: "Unknown",
        publishedAt: new Date().toISOString(),
        sourceUrl,
      };
      return ok({ article: stub });
    } catch {
      return fail(404, "Article not found");
    }
  }

  // Case 2: Search articles by keyword
  if (q) {
    const articles = await fetchFromNewsAPI({ query: q });
    return ok({ articles });
  }

  // Case 3: Fetch by category (default feed)
  const articles = await fetchFromNewsAPI({ category: category || undefined });
  return ok({ articles });
}
