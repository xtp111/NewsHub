"use client";

import { useParams } from "next/navigation";
import ArticleDetail from "@/components/news/ArticleDetail";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import styled from "styled-components";
import type { Article } from "@/types";
import { useFetch } from "@/hooks/useFetch";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 5%;
  background-color: white;
`;

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch<{ article: Article }>(
    id ? `/api/news?id=${id}` : ""
  );
  const article = data?.article;

  return (
    <Container>
      <AsyncBoundary
        loading={loading}
        error={error ?? (!loading && !article ? "Article not found" : null)}
      >
        {article && <ArticleDetail article={article} />}
      </AsyncBoundary>
    </Container>
  );
}
