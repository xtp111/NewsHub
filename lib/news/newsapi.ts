import type { Article } from "@/types";
import { generateArticleId } from "./articleId";
import { queryCache, articleCache, CACHE_TTL } from "./cache";

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export const CATEGORY_MAP: Record<string, string> = {
  Tech: "technology",
  World: "general",
  Culture: "entertainment",
  Finance: "business",
  Sports: "sports",
};

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

function transformArticle(apiArticle: NewsApiArticle, uiCategory: string): Article {
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
  articleCache.set(article.id, article);
  return article;
}

export async function fetchFromNewsAPI(opts: {
  category?: string;
  query?: string;
}): Promise<Article[]> {
  if (!NEWS_API_KEY) {
    console.warn("NEWS_API_KEY is not set");
    return [];
  }

  const { category, query } = opts;
  const cacheKey = category ? `category=${category}` : query ? `q=${query}` : "top";

  const cached = queryCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.articles;
  }

  let url: string;
  let uiCategory = "General";

  if (query) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`;
  } else if (category && category !== "all") {
    const apiCategory = CATEGORY_MAP[category] || "general";
    uiCategory = category;
    url = `https://newsapi.org/v2/top-headlines?country=us&category=${apiCategory}&pageSize=20&apiKey=${NEWS_API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${NEWS_API_KEY}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "ok") {
      console.warn("NewsAPI error:", data.message || data.code);
      return cached?.articles || [];
    }

    const articles: Article[] = (data.articles as NewsApiArticle[])
      .filter((a) => a.title && a.title !== "[Removed]" && a.url && a.url !== "[Removed]")
      .map((a) => transformArticle(a, query ? "General" : uiCategory));

    queryCache.set(cacheKey, { articles, timestamp: Date.now() });
    return articles;
  } catch (error) {
    console.error("Failed to fetch from NewsAPI:", error);
    return cached?.articles || [];
  }
}
