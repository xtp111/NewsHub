/**
 * News API Route - /api/news
 *
 * Server-side API endpoint that fetches real news data from NewsAPI.org.
 * Supports three query modes:
 *   - ?id=X       → Get a single article by its base64url-encoded ID
 *   - ?q=keyword  → Search articles by keyword (uses /everything endpoint)
 *   - ?category=X → Browse articles by category (uses /top-headlines endpoint)
 *
 * Includes a 15-minute in-memory cache to minimize API calls (free tier: 100 req/day).
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Article } from "@/types";

// NewsAPI.org API key loaded from environment variables
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Cache time-to-live: 15 minutes in milliseconds
const CACHE_TTL = 15 * 60 * 1000;

// Maps UI category names to NewsAPI category parameter values
const CATEGORY_MAP: Record<string, string> = {
  Tech: "technology",
  World: "general",
  Culture: "entertainment",
  Finance: "business",
  Sports: "sports",
};

// Reverse mapping: NewsAPI categories back to UI category names (currently unused but available)
const REVERSE_CATEGORY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_MAP).map(([k, v]) => [v, k])
);

// Cache entry structure for query-level caching
interface CacheEntry {
  articles: Article[];
  timestamp: number;
}

// In-memory cache: stores fetched article lists keyed by query parameters
const queryCache = new Map<string, CacheEntry>();

// In-memory cache: stores individual articles keyed by their base64url ID
const articleCache = new Map<string, Article>();

/**
 * Generates a deterministic, collision-free article ID by base64url-encoding the article URL.
 * This allows reversing the ID back to the original URL when needed.
 */
function generateArticleId(url: string): string {
  return Buffer.from(url).toString("base64url");
}

/**
 * Decodes a base64url-encoded article ID back to the original article URL.
 */
function decodeArticleId(id: string): string {
  return Buffer.from(id, "base64url").toString("utf-8");
}

// Shape of individual article objects returned by NewsAPI.org
interface NewsApiArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

/**
 * Transforms a raw NewsAPI article into the app's Article interface.
 * Also stores the transformed article in the articleCache for later single-article lookups.
 */
function transformArticle(
  apiArticle: NewsApiArticle,
  uiCategory: string
): Article {
  const article: Article = {
    id: generateArticleId(apiArticle.url),
    title: apiArticle.title || "Untitled",
    summary: apiArticle.description || "",
    content: apiArticle.content || undefined,
    category: uiCategory,
    author: apiArticle.author || apiArticle.source.name || "Unknown",
    publishedAt: apiArticle.publishedAt,
    imageUrl: apiArticle.urlToImage || undefined,
    sourceUrl: apiArticle.url,
  };
  // Cache individual article for single-article lookups via ?id=X
  articleCache.set(article.id, article);
  return article;
}

/**
 * Fetches articles from NewsAPI.org with caching.
 * - If a cached result exists and is fresh (within TTL), returns it immediately.
 * - Otherwise, makes a network request and updates the cache.
 * - On API failure, falls back to stale cached data if available.
 */
async function fetchFromNewsAPI(opts: {
  category?: string;
  query?: string;
}): Promise<Article[]> {
  if (!NEWS_API_KEY) {
    console.warn("NEWS_API_KEY is not set");
    return [];
  }

  const { category, query } = opts;

  // Build a unique cache key based on the request parameters
  const cacheKey = category
    ? `category=${category}`
    : query
      ? `q=${query}`
      : "top";

  // Return cached data if still fresh
  const cached = queryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.articles;
  }

  // Construct the appropriate NewsAPI URL based on query type
  let url: string;
  let uiCategory = "General";

  if (query) {
    // Search mode: use /everything endpoint with keyword search
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`;
  } else if (category && category !== "all") {
    // Category browse mode: use /top-headlines with specific category
    const apiCategory = CATEGORY_MAP[category] || "general";
    uiCategory = category;
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${apiCategory}&pageSize=20&apiKey=${NEWS_API_KEY}`;
  } else {
    // Default: fetch top headlines without category filter
    url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${NEWS_API_KEY}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok") {
      console.warn("NewsAPI error:", data.message || data.code);
      return cached?.articles || [];
    }

    // Filter out removed/invalid articles and transform to our Article format
    const articles: Article[] = (data.articles as NewsApiArticle[])
      .filter(
        (a) =>
          a.title && a.title !== "[Removed]" && a.url && a.url !== "[Removed]"
      )
      .map((a) => {
        // Search results don't have a specific category; default to "General"
        const cat = query ? "General" : uiCategory;
        return transformArticle(a, cat);
      });

    // Update the query cache with fresh data
    queryCache.set(cacheKey, { articles, timestamp: Date.now() });
    return articles;
  } catch (error) {
    console.error("Failed to fetch from NewsAPI:", error);
    // Fall back to stale cached data on network error
    return cached?.articles || [];
  }
}

/**
 * GET /api/news
 * Main request handler that routes to the appropriate data source based on query parameters.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const id = searchParams.get("id");

  // Mode 1: Get a single article by its base64url-encoded ID
  if (id) {
    const cached = articleCache.get(id);
    if (cached) {
      return NextResponse.json({ article: cached });
    }
    // Cache miss: decode ID back to original URL and return a stub article
    // The stub directs the user to the original source
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
      return NextResponse.json({ article: stub });
    } catch {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }
  }

  // Mode 2: Search articles by keyword
  if (q) {
    const articles = await fetchFromNewsAPI({ query: q });
    return NextResponse.json({ articles });
  }

  // Mode 3: Browse articles by category (or all top headlines)
  const articles = await fetchFromNewsAPI({
    category: category || undefined,
  });
  return NextResponse.json({ articles });
}
