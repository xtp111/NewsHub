"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import type { Article } from "@/types";

const Container = styled.article`
  background: #fff;
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

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

const Meta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

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
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.8;
  color: #333;

  p {
    margin-bottom: 20px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e8e8e8;
`;

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

export default function ArticleDetail({ article }: { article: Article }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

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
    return () => {
      cancelled = true;
    };
  }, [article.id]);

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

  return (
    <Container>
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

      <ImageWrapper>
        {article.imageUrl ? "Article Image" : "No Image"}
      </ImageWrapper>

      <Content>
        <p>{article.content || article.summary}</p>
        <p>This is the full article content...</p>
      </Content>

      <Actions>
        <ActionButton $active={hasLiked} onClick={handleLike}>
          {hasLiked ? "Liked" : "Like"} ({likes})
        </ActionButton>
        <ActionButton>Share</ActionButton>
      </Actions>
    </Container>
  );
}
