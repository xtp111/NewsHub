"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArticleDetail from "@/app/components/ArticleDetail";
import styled from "styled-components";
import type { Article } from "@/types";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 64px;
  color: #666;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 64px;
  color: #e74c3c;
`;

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

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

  if (loading) {
    return (
      <Container>
        <LoadingState>Loading...</LoadingState>
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container>
        <ErrorState>{error || "Article not found"}</ErrorState>
      </Container>
    );
  }

  return (
    <Container>
      <ArticleDetail article={article} />
    </Container>
  );
}
