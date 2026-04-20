// Member: Yuchen Bao
// NewsCard: Displays a single news article as a card in the news grid.

//import { Card, CardImageWrapper, CardThumbnail, CardContent, CardLink, CardTitle, CardCategory, CardMeta } from "@/components/primitives";
import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import type { Article } from "@/types";


// Styled components
const Card = styled.div`
  height: 100%;
  background: var(--color-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;
  position: relative;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardImageWrapper = styled.div<{ $height?: string }>`
  width: 100%;
  height: calc(180px + 1vh);
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-disabled);
  overflow: hidden;
`;

const CardThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div<{ $padding?: string }>`
  padding: 1rem 1.5rem 1.5rem;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0.5rem 0;
`;

// Category label
const CardCategory = styled.span`
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-primary);
`;

// Footer row displaying author and date
const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--color-text-disabled);
`;

// Article summary, clamped to 2 lines
const Summary = styled.p`
  font-size: 14px;
  color: var(--color-text-subtle);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`;

export default function NewsCard({ article }: { article: Article }) {
  // Track image load errors to show fallback text
  const [imgError, setImgError] = useState(false);

  return (
    <CardLink href={`/article/${article.id}`}>
      <Card>
        <CardImageWrapper>
          {/* Show article image if available and not errored; otherwise show fallback */}
          <CardThumbnail
            src={article.imageUrl && !imgError ? article.imageUrl : "/placeholder.png"}
            alt={article.title}
            onError={() => setImgError(true)}
          />
        </CardImageWrapper>
        <CardContent>
          <CardCategory>{article.category}</CardCategory>
          <CardTitle>{article.title}</CardTitle>
          <Summary>{article.summary}</Summary>
          <CardMeta>
            <span>{article.author}</span>
            <span>
              {new Date(article.publishedAt).toLocaleDateString("en-US")}
            </span>
          </CardMeta>
        </CardContent>
      </Card>
    </CardLink>
  );
}
