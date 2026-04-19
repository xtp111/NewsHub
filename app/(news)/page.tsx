"use client";

import { useState } from "react";
import NewsCard from "@/components/news/NewsCard";
import CategoryTabs from "@/components/news/CategoryTabs";
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

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export default function Home() {
  const [category, setCategory] = useState("all");
  const { data, loading, error } = useFetch<{ articles: Article[] }>(
    `/api/news?category=${category}`
  );
  const news = data?.articles ?? [];

  return (
    <Container>
      <Header>
        <Title>Today&apos;s News</Title>
        <SearchBar />
      </Header>
      <CategoryTabs activeCategory={category} onCategoryChange={setCategory} />
      <AsyncBoundary loading={loading} error={error}>
        <NewsGrid>
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </NewsGrid>
      </AsyncBoundary>
    </Container>
  );
}
