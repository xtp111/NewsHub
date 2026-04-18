/**
 * BookmarkList Component
 *
 * Displays a responsive grid of bookmarked articles.
 * Each bookmark card shows a thumbnail image, category, title, author, and date.
 * - Delete button (X) on each card to remove the bookmark via BookmarkContext
 * - Clicking the card navigates to the article detail page
 * - Shows an empty state message when no bookmarks exist
 *
 * BookmarkImage is a separate subcomponent to avoid React hook rules
 * violations when using useState inside a .map() callback.
 */

import { useState } from "react";
import Link from "next/link";
import { useBookmarks } from "@/context/BookmarkContext";
import styled from "styled-components";
import type { BookmarkData } from "@/types";

/* --- Styled Components --- */

// Responsive grid container for bookmark cards
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

// Individual bookmark card with relative positioning for the delete button
const Card = styled.div`
  background: var(--color-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  position: relative;
`;

// Thumbnail image container
const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  background: var(--color-bg-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-placeholder);
  overflow: hidden;
`;

// Bookmark thumbnail image
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Card content area below the image
const Content = styled.div`
  padding: 16px;
`;

// Category label
const Category = styled.span`
  font-size: 12px;
  color: var(--color-primary);
`;

// Bookmark title
const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin: 8px 0;
  line-height: 1.4;
`;

// Author and date metadata
const Meta = styled.div`
  font-size: 12px;
  color: var(--color-text-placeholder);
`;

// Circular delete button positioned at top-right corner of the card
const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
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

// Empty state shown when the user has no bookmarks
const EmptyState = styled.div`
  text-align: center;
  padding: 64px;
  color: var(--color-text-placeholder);
  grid-column: 1 / -1;
`;

// Makes the entire card clickable as a link
const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

/* --- Sub-Component --- */

/**
 * BookmarkImage - Handles individual image error state.
 * Extracted as a separate component so each bookmark card can independently
 * track its own image load error via useState (required by React's Rules of Hooks).
 */
function BookmarkImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (!src || error) return <>No Image</>;
  return (
    <ThumbnailImage src={src} alt={alt} onError={() => setError(true)} />
  );
}

/* --- Component --- */

export default function BookmarkList({
  bookmarks,
}: {
  bookmarks: BookmarkData[];
}) {
  const { removeBookmark } = useBookmarks();

  // Show empty state if user has no bookmarks
  if (bookmarks.length === 0) {
    return <EmptyState>No bookmarked articles yet</EmptyState>;
  }

  return (
    <Container>
      {bookmarks.map((bookmark) => (
        <Card key={bookmark._id}>
          {/* Delete button to remove this bookmark */}
          <DeleteButton
            onClick={() => removeBookmark(bookmark._id)}
            title="Remove bookmark"
          >
            &times;
          </DeleteButton>
          {/* Card content links to the article detail page */}
          <StyledLink href={`/article/${bookmark.articleId}`}>
            <ImageWrapper>
              <BookmarkImage src={bookmark.imageUrl} alt={bookmark.title} />
            </ImageWrapper>
            <Content>
              <Category>{bookmark.category}</Category>
              <Title>{bookmark.title}</Title>
              <Meta>
                {bookmark.author} &middot;{" "}
                {new Date(bookmark.publishedAt).toLocaleDateString("en-US")}
              </Meta>
            </Content>
          </StyledLink>
        </Card>
      ))}
    </Container>
  );
}
