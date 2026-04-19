"use client";

import { useSearchParams } from "next/navigation";
import NewsCard from "@/components/news/NewsCard";
import SearchBar from "@/components/layout/SearchBar";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import styled from "styled-components";
import type { Article } from "@/types";
import { useFetch } from "@/hooks/useFetch";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

const SearchInfo = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 24px;
  font-size: 14px;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 24px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const fetchUrl = query ? `/api/news?q=${encodeURIComponent(query)}` : "";
  const { data, loading, error } = useFetch<{ articles: Article[] }>(fetchUrl, [query]);
  const results = data?.articles ?? [];

  return (
    <Container>
      <Title>Search Results</Title>
      <SearchBar initialValue={query} />

      {query && (
        <SearchInfo>
          Results for &quot;{query}&quot; ({results.length} found)
        </SearchInfo>
      )}

      <AsyncBoundary
        loading={loading}
        error={error}
        loadingFallback={<div style={{ textAlign: "center", padding: "2rem" }}>Searching...</div>}
      >
        {results.length > 0 ? (
          <NewsGrid>
            {results.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </NewsGrid>
        ) : (
          <EmptyState>
            {query
              ? `No articles found for "${query}"`
              : "Enter a keyword to start searching"}
          </EmptyState>
        )}
      </AsyncBoundary>
    </Container>
  );
}
