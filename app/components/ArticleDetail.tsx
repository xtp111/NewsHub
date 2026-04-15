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

"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import type { Article } from "@/types";

/* --- Styled Components --- */

const Container = styled.article`
  background: #fff;
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

// Category label at the top of the article
const Category = styled.span`
  font-size: 14px;
  color: #0066cc;
  font-weight: 500;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 16px 0;
  line-height: 1.3;
`;

// Author and date metadata row
const Meta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

// Hero image container with fixed height
const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
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
  color: #333;

  p {
    margin-bottom: 20px;
  }
`;

// Link to original article source
const ReadMoreLink = styled.a`
  display: inline-block;
  margin-top: 8px;
  color: #0066cc;
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
  border-top: 1px solid #e8e8e8;
`;

// Action button with active state styling for the "liked" state
const ActionButton = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: ${(props) => (props.$active ? "#0066cc" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#555")};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: #0066cc;
  }
`;

/* --- Helper Functions --- */

/**
 * Cleans truncated content from NewsAPI by removing the "[+N chars]" marker
 * and replacing it with an ellipsis.
 */
function cleanContent(content: string): string {
  return content.replace(/\[\+\d+ chars\]$/, "...");
}

/* --- Component --- */

export default function ArticleDetail({ article }: { article: Article }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [shareText, setShareText] = useState("Share");

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
        // User cancelled the share dialog
      }
    } else {
      // Fallback: copy the article URL to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setShareText("Link Copied!");
      setTimeout(() => setShareText("Share"), 2000);
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
        {article.imageUrl && !imgError ? (
          <ArticleImage
            src={article.imageUrl}
            alt={article.title}
            onError={() => setImgError(true)}
          />
        ) : (
          "No Image"
        )}
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

      {/* Like and share action buttons */}
      <Actions>
        <ActionButton $active={hasLiked} onClick={handleLike}>
          {hasLiked ? "Liked" : "Like"} ({likes})
        </ActionButton>
        <ActionButton onClick={handleShare}>{shareText}</ActionButton>
      </Actions>
    </Container>
  );
}
