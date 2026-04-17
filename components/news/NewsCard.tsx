/**
 * NewsCard Component
 *
 * Displays a single news article as a card in the news grid.
 * Features:
 * - Thumbnail image with graceful fallback ("No Image") on load error
 * - Article category label, title (clamped to 2 lines), and summary
 * - Author name and formatted publish date in the footer
 * - Entire card is clickable, linking to the article detail page
 */

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import type { Article } from "@/types";

/* --- Styled Components --- */

// Card container with subtle shadow and hover elevation effect
const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

// Image container with fixed height and grey fallback background
const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
  overflow: hidden;
`;

// Thumbnail image that fills its container with cover mode
const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Content area below the image
const Content = styled.div`
  padding: 16px;
`;

// Category label displayed above the title
const Category = styled.span`
  font-size: 12px;
  color: #0066cc;
  font-weight: 500;
`;

// Article title, clamped to 2 lines with ellipsis overflow
const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Article summary, clamped to 2 lines
const Summary = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`;

// Footer row displaying author and date
const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
`;

// Wrapper link that makes the entire card clickable
const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

/* --- Component --- */

export default function NewsCard({ article }: { article: Article }) {
  // Track image load errors to show fallback text
  const [imgError, setImgError] = useState(false);

  return (
    <StyledLink href={`/article/${article.id}`}>
      <Card>
        <ImageWrapper>
          {/* Show article image if available and not errored; otherwise show fallback */}
          {article.imageUrl && !imgError ? (
            <ThumbnailImage
              src={article.imageUrl}
              alt={article.title}
              onError={() => setImgError(true)}
            />
          ) : (
            "No Image"
          )}
        </ImageWrapper>
        <Content>
          <Category>{article.category}</Category>
          <Title>{article.title}</Title>
          <Summary>{article.summary}</Summary>
          <Meta>
            <span>{article.author}</span>
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US")}
            </span>
          </Meta>
        </Content>
      </Card>
    </StyledLink>
  );
}
