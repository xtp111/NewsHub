/**
 * BookmarkContext - Global Bookmark State Management
 *
 * Provides a React Context for managing bookmarks across the entire application.
 * Features:
 * - Fetches all bookmarks from the API on initial mount
 * - addBookmark: Saves an article as a bookmark via POST /api/bookmarks
 * - removeBookmark: Deletes a bookmark via DELETE /api/bookmarks/[id]
 * - isBookmarked: Checks if a specific article is already bookmarked
 *
 * The BookmarkProvider wraps the app in the StyledComponentsRegistry,
 * making bookmark state available to all client components.
 */

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Article, BookmarkData } from "@/types";

// Shape of the bookmark context value
interface BookmarkContextType {
  bookmarks: BookmarkData[];
  loading: boolean;
  addBookmark: (article: Article) => Promise<boolean>;
  removeBookmark: (bookmarkId: string) => Promise<boolean>;
  isBookmarked: (articleId: string) => boolean;
}

// Create context with undefined default (enforced by useBookmarks hook)
const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

/**
 * BookmarkProvider - Wraps children with bookmark state and CRUD operations.
 */
export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookmarks from the API when the provider mounts
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // Load all bookmarks from the server
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

  // Save a new bookmark by posting article data to the API
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
          sourceUrl: article.sourceUrl,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Prepend new bookmark to the list (newest first)
        setBookmarks((prev) => [data.bookmark, ...prev]);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to add bookmark:", error);
      return false;
    }
  };

  // Delete a bookmark by its MongoDB _id
  const removeBookmark = async (bookmarkId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove the deleted bookmark from local state
        setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
      return false;
    }
  };

  // Check if an article is already bookmarked by its article ID
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

/**
 * useBookmarks - Custom hook to access the BookmarkContext.
 * Throws an error if used outside of a BookmarkProvider.
 */
export function useBookmarks(): BookmarkContextType {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
