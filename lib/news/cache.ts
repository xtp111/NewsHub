import type { Article } from "@/types";

export const CACHE_TTL = 15 * 60 * 1000;

export interface CacheEntry {
  articles: Article[];
  timestamp: number;
}

export const queryCache = new Map<string, CacheEntry>();
export const articleCache = new Map<string, Article>();
