"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NewsCard from "@/app/components/NewsCard";
import SearchBar from "@/app/components/SearchBar";
import styled from "styled-components";
import type { Article } from "@/types";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
`;

const SearchInfo = styled.div`
  color: #666;
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
  color: #999;
`;

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/news?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      setResults(data.articles || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Search Results</Title>
      <SearchBar initialValue={query} />

      {query && (
        <SearchInfo>
          Results for &quot;{query}&quot; ({results.length} found)
        </SearchInfo>
      )}

      {loading ? (
        <div>Searching...</div>
      ) : results.length > 0 ? (
        <NewsGrid>
          {results.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </NewsGrid>
      ) : query ? (
        <EmptyState>No articles found for &quot;{query}&quot;</EmptyState>
      ) : (
        <EmptyState>Enter a keyword to start searching</EmptyState>
      )}
    </Container>
  );
}
