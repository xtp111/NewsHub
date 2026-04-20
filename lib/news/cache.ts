// Member: Tianpeng Xu
// Defines in-memory caching structures for storing search results and individual articles

import type { Article } from "@/types";

// Time-to-live (TTL) for cache entries: 15 minutes (in milliseconds)
export const CACHE_TTL = 15 * 60 * 1000;

// Structure for cached search query results, including data and timestamp
export interface CacheEntry {
  articles: Article[];
  timestamp: number;
}

// Cache for search queries: maps query string to cached articles + timestamp
export const queryCache = new Map<string, CacheEntry>();

// Cache for individual articles: maps article ID to article data
export const articleCache = new Map<string, Article>();
