// Member: Tianpeng Xu
// fetch articles by id, search query, or category

import type { NextRequest } from "next/server";
import type { Article } from "@/types";
import { fetchFromNewsAPI } from "@/lib/news/newsapi";
import { articleCache } from "@/lib/news/cache";
import { decodeArticleId } from "@/lib/news/articleId";
import { ok, fail } from "@/lib/api/respond";

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
    // Fallback: reconstruct article from encoded URL if not cached
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
