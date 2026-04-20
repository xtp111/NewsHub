// Member: Aiqi Xu
// Article Page: display single news article

"use client";

import { useParams } from "next/navigation";
import ArticleDetail from "@/components/news/ArticleDetail";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import styled from "styled-components";
import type { Article } from "@/types";
import { useFetch } from "@/hooks/useFetch";

// styled page content container
const Container = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  padding: 2% 4% 6%;
  background-color: var(--color-bg);
  // responsive design  
  @media screen and (max-width: 800px) {
      width: 100%;
      max-width: none;
  }  
`;

export default function ArticlePage() {
  // extract article ID from dynamic route parameters
  const { id } = useParams<{ id: string }>();
  // fetch article data from API using the retrieved ID
  const { data, loading, error } = useFetch<{ article: Article }>(
    id ? `/api/news?id=${id}` : ""
  );
  // access article object from response
  const article = data?.article;

  return (
    <Container>
      {/* handling loading & error states for async data fetching */}
      <AsyncBoundary
        loading={loading}
        error={error ?? (!loading && !article ? "Article not found" : null)}
      >
        {/* render article details only when data is available */}
        {article && <ArticleDetail article={article} />}
      </AsyncBoundary>
    </Container>
  );
}
