// Member: Yuchen Bao
// BookmarkList: NewsGrid of bookmark NewsCards

import NewsCard from "@/components/news/NewsCard";
import { NewsGrid } from "@/components/primitives";
import { useBookmarks } from "@/context/BookmarkContext";
import styled from "styled-components";
import type { BookmarkData } from "@/types";

// Button to delete bookmark
const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-danger);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--color-danger);
    color: var(--color-text-inverse);
  }
`;

// Wrapping delete button & newscard
const CardWrapper = styled.div`
  position: relative;
  > a {
    height: 100%; // let cards be the same height
  }
`;

// If no bookmark found, show EmptyState
const EmptyState = styled.div`
  text-align: center;
  padding: 64px;
  color: var(--color-text-disabled);
  grid-column: 1 / -1;
`;

export default function BookmarkList({
  bookmarks,
}: {
  bookmarks: BookmarkData[];
}) {
  const { removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return <EmptyState>No bookmarked articles yet</EmptyState>;
  }

  return (
    <NewsGrid>
      {bookmarks.map((bookmark) => (
        <CardWrapper key={bookmark._id}>
          <DeleteButton
            onClick={(e) => { e.preventDefault(); removeBookmark(bookmark._id); }}
            title="Remove bookmark"
          >
            &times;
          </DeleteButton>
          <NewsCard article={{
            id: bookmark.articleId,
            title: bookmark.title,
            summary: bookmark.summary,
            category: bookmark.category,
            author: bookmark.author,
            publishedAt: bookmark.publishedAt,
            imageUrl: bookmark.imageUrl,
            sourceUrl: bookmark.sourceUrl ?? "",
          }} />
        </CardWrapper>
      ))}
    </NewsGrid>
  );
}

