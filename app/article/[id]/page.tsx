/**
 * Article Detail Page - /article/[id]
 *
 * Client-side page that fetches and displays a single article by its ID.
 * The [id] is a base64url-encoded article URL used as a deterministic identifier.
 *
 * Shows loading, error, or the full ArticleDetail component based on fetch state.
 * Uses useParams() to access the dynamic route segment on the client side.
 */

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleDetail from "@/app/components/ArticleDetail";
import styled from "styled-components";
import type { Article } from "@/types";

/* --- Styled Components --- */

// Narrow container for readable article width
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 5%;
  background-color: white;
`;

// Centered loading indicator
const LoadingState = styled.div`
  text-align: center;
  padding: 64px;
  color: #666;
`;

// Centered error message in red
const ErrorState = styled.div`
  text-align: center;
  padding: 64px;
  color: #e74c3c;
`;

/* --- Component --- */

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the article data when the page loads or when the ID changes
  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Request article data from the news API using the article ID
  const fetchArticle = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/news?id=${id}`);
      if (!res.ok) {
        throw new Error("Article not found");
      }
      const data = await res.json();
      setArticle(data.article);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Container>
        <LoadingState>Loading...</LoadingState>
      </Container>
    );
  }

  // Render error state
  if (error || !article) {
    return (
      <Container>
        <ErrorState>{error || "Article not found"}</ErrorState>
      </Container>
    );
  }

  // Render the full article detail
  return (
    <Container>
      <ArticleDetail article={article} />
    </Container>
  );
}
