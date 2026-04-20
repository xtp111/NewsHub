/**
 * ArticleDetail Component
 *
 * Full article view with:
 * - Hero image with fallback on load error
 * - Article metadata (category, title, author, date)
 * - Article content with truncation marker cleanup
 * - "Read full article" link to the original news source
 * - Like button (persisted to MongoDB via /api/likes)
 * - Share button using Web Share API with clipboard fallback
 */

import { useState, useEffect } from "react";
import styled from "styled-components";
import { useBookmarks } from "@/context/BookmarkContext";
import type { Article } from "@/types";

/* --- Styled Components --- */

const Container = styled.article`
  background: var(--color-bg);
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

// Category label at the top of the article
const Category = styled.span`
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 500;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: var(--color-text);
  margin: 16px 0;
  line-height: 1.3;
`;

// Author and date metadata row
const Meta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--color-text-subtle);
  margin-bottom: 24px;
`;

// Hero image container with fixed height
const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: var(--color-bg-subtle);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-disabled);
  margin-bottom: 32px;
  overflow: hidden;
`;

// Full-width article hero image
const ArticleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Article body text area
const Content = styled.div`
  font-size: 17px;
  line-height: 1.8;
  color: var(--color-text-secondary);

  p {
    margin-bottom: 20px;
  }
`;

// Link to original article source
const ReadMoreLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Action buttons row (like, share)
const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border-subtle);
`;

// Action button with active state styling for the "liked" state
const ActionButton = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: ${(props) => (props.$active ? "var(--color-primary)" : "var(--color-bg)")};
  color: ${(props) => (props.$active ? "var(--color-text-inverse)" : "var(--color-text-subtle)")};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
  }
`;

/* --- Helper Functions --- */

/**
 * Cleans truncated content from NewsAPI by removing the "[+N chars]" marker
 * and replacing it with an ellipsis.
 */
function cleanContent(content: string): string {
  return content.replace(/\[\+\d+ chars]$/, "...");
}

/* --- Component --- */

export default function ArticleDetail({ article }: { article: Article }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [shareText, setShareText] = useState("Share");
  const { addBookmark, removeBookmark, isBookmarked, bookmarks } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  // Fetch the current like count when the component mounts or article changes.
  // Uses .then() chain (not async/await) to satisfy ESLint's set-state-in-effect rule.
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/likes/${article.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!cancelled) {
            setLikes(data.count);
            setHasLiked(data.hasLiked);
          }
        })
        .catch((error) => console.error("Failed to fetch likes:", error));
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      cancelled = true;
    };
  }, [article.id]);

  // Toggle like/unlike by sending a POST request to the likes API
  const handleLike = async () => {
    try {
      const action = hasLiked ? "unlike" : "like";
      const res = await fetch(`/api/likes/${article.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      setLikes(data.count);
      setHasLiked(data.hasLiked);
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };

  // Share using Web Share API (mobile) or copy to clipboard (desktop fallback)
  const handleShare = async () => {
    const shareUrl = article.sourceUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: shareUrl,
        });
      } catch {
        // User canceled the share dialog
      }
    } else {
      // Fallback: copy the article URL to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setShareText("Link Copied!");
      setTimeout(() => setShareText("Share"), 2000);
    }
  };

  // Toggle bookmark: add if not bookmarked, remove if already bookmarked
  const handleBookmark = async () => {
    if (bookmarked) {
      const existing = bookmarks.find((b) => b.articleId === article.id);
      if (existing) {
        await removeBookmark(existing._id);
      }
    } else {
      await addBookmark(article);
    }
  };

  return (
      <Container>
        {/* Article header: category, title, and metadata */}
        <Header>
          <Category>{article.category}</Category>
          <Title>{article.title}</Title>
          <Meta>
            <span>{article.author}</span>
            <span>
            {new Date(article.publishedAt).toLocaleString("en-US")}
          </span>
          </Meta>
        </Header>

        {/* Hero image with fallback */}
        <ImageWrapper>
          <ArticleImage
              src={article.imageUrl && !imgError ? article.imageUrl : "/placeholder.png"}
              alt={article.title}
              onError={() => setImgError(true)}
          />
        </ImageWrapper>

        {/* Article body content and "Read full article" link */}
        <Content>
          <p>{article.content ? cleanContent(article.content) : article.summary}</p>
          {article.sourceUrl && (
              <ReadMoreLink
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
              >
                Read full article &rarr;
              </ReadMoreLink>
          )}
        </Content>

        {/* Like, Bookmark, and Share action buttons */}
        <Actions>
          <ActionButton $active={hasLiked} onClick={handleLike}>
            {hasLiked ? "Liked" : "Like"} ({likes})
          </ActionButton>
          <ActionButton $active={bookmarked} onClick={handleBookmark}>
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </ActionButton>
          <ActionButton onClick={handleShare}>{shareText}</ActionButton>
        </Actions>
      </Container>
  );
}