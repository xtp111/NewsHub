// Member: Aiqi Xu
// Home Page of the App

"use client";

import { useState } from "react";
import { PageContainer, PageTitle, NewsGrid } from "@/components/primitives";
import NewsCard from "@/components/news/NewsCard";
import CategoryTabs from "@/components/news/CategoryTabs";
import SearchBar from "@/components/layout/SearchBar";
import AsyncBoundary from "@/components/ui/AsyncBoundary";
import styled from "styled-components";
import type { Article } from "@/types";
import { useFetch } from "@/hooks/useFetch";

// styled header
const Header = styled.div`
  margin-bottom: 2%;
`;

export default function Home() {
  // State to track the selected news category (default is "all")
  const [category, setCategory] = useState("all");
  // Fetch news data based on the selected category
  // The API endpoint updates whenever `category` changes
  const { data, loading, error } = useFetch<{ articles: Article[] }>(
    `/api/news?category=${category}`
  );
  // Fallback to empty array if data is not yet available
  const news = data?.articles ?? [];

  // Render the UI
  return (
    <PageContainer>
      {/* Page header section with title and search */}
      <Header>
        <PageTitle>Today&apos;s News</PageTitle>
        <SearchBar />
      </Header>
      {/* Category filter tabs */}
      <CategoryTabs activeCategory={category} onCategoryChange={setCategory} />
      {/* Handle loading and error states while fetching data */}
      <AsyncBoundary loading={loading} error={error}>
        {/* Display list of news articles */}
        <NewsGrid>
          {news.map((article) => (
            // Render individual news article card
            <NewsCard key={article.id} article={article} />
          ))}
        </NewsGrid>
      </AsyncBoundary>
    </PageContainer>
  );
}
