"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Article, BookmarkData } from "@/types";

interface BookmarkContextType {
  bookmarks: BookmarkData[];
  loading: boolean;
  addBookmark: (article: Article) => Promise<boolean>;
  removeBookmark: (bookmarkId: string) => Promise<boolean>;
  isBookmarked: (articleId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch("/api/bookmarks");
      const data = await res.json();
      setBookmarks(data.bookmarks || []);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (article: Article): Promise<boolean> => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId: article.id,
          title: article.title,
          summary: article.summary,
          imageUrl: article.imageUrl,
          category: article.category,
          author: article.author,
          publishedAt: article.publishedAt,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBookmarks((prev) => [data.bookmark, ...prev]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to add bookmark:", error);
      return false;
    }
  };

  const removeBookmark = async (bookmarkId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
      return false;
    }
  };

  const isBookmarked = (articleId: string): boolean => {
    return bookmarks.some((b) => b.articleId === articleId);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        loading,
        addBookmark,
        removeBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks(): BookmarkContextType {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
