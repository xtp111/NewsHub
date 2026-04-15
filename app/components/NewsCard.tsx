"use client";

import Link from "next/link";
import styled from "styled-components";
import type { Article } from "@/types";

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

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
`;

const Content = styled.div`
  padding: 16px;
`;

const Category = styled.span`
  font-size: 12px;
  color: #0066cc;
  font-weight: 500;
`;

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

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

export default function NewsCard({ article }: { article: Article }) {
  return (
    <StyledLink href={`/article/${article.id}`}>
      <Card>
        <ImageWrapper>
          {article.imageUrl ? "Image" : "No Image"}
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
