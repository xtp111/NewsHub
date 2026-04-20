// Member: Aiqi Xu
// Search Page: search for latest news by keywords

"use client";

import { useSearchParams } from "next/navigation";
import { PageContainer, PageTitle, NewsGrid } from "@/components/primitives";
import NewsCard from "@/components/news/NewsCard";
import SearchBar from "@/components/layout/SearchBar";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import styled from "styled-components";
import type { Article } from "@/types";
import { useFetch } from "@/hooks/useFetch";

// Styled components
const SearchInfo = styled.div`
    margin: 0.5rem 0.25rem 1.5rem;
    color: var(--color-text-subtle);
    font-size: 0.85rem;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 8% 4%;
    color: var(--color-text-subtle);
`;

export default function SearchPage() {
  // Read query params from URL (e.g., ?q=keyword)
  const searchParams = useSearchParams();
  // Extract search keyword; fallback to empty string if not provided
  const query = searchParams.get("q") || "";
  // Build API URL only when query exists to avoid unnecessary requests
  const fetchUrl = query ? `/api/news?q=${encodeURIComponent(query)}` : "";
  // Fetch articles based on query; re-run when `query` changes
  const { data, loading, error } = useFetch<{ articles: Article[] }>(fetchUrl, [query]);
  // Safely extract results (default to empty array)
  const results = data?.articles ?? [];

  return (
    <PageContainer>
      <PageTitle>Search Results</PageTitle>
      {/* Search input, pre-filled with current query */}
      <SearchBar initialValue={query} />
      {/* Show search summary only when user has entered a query */}
      {query && (
        <SearchInfo>
          Results for &quot;{query}&quot; ({results.length} found)
        </SearchInfo>
      )}

      {/* Handle loading / error / success states */}
      <AsyncBoundary
        loading={loading}
        error={error}
        loadingFallback={<div style={{ textAlign: "center", padding: "2rem" }}>Searching...</div>}
      >
        {/* If results exist, render list */}
        {results.length > 0 ? (
          <NewsGrid>
            {results.map((article) => (
              // Render each article card
              <NewsCard key={article.id} article={article} />
            ))}
          </NewsGrid>
        ) : (
          // Empty state: either no results or no query yet
          <EmptyState>
            {query
              ? `No articles found for "${query}"`
              : "Enter a keyword to start searching"}
          </EmptyState>
        )}
      </AsyncBoundary>
    </PageContainer>
  );
}
