/**
 * Home Page - /
 *
 * Main landing page of the NewsHub app.
 * Displays:
 * - Page title ("Today's News")
 * - Search bar for quick access to search
 * - Category filter tabs to browse news by topic
 * - Responsive grid of news article cards
 *
 * Fetches articles from /api/news on mount and whenever the selected category changes.
 */

"use client";

import { useState, useEffect } from "react";
import NewsCard from "@/app/components/NewsCard";
import CategoryTabs from "@/app/components/CategoryTabs";
import SearchBar from "@/app/components/SearchBar";
import styled from "styled-components";
import type { Article } from "@/types";

/* --- Styled Components --- */

// Page-level container with centered content
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

// Header section containing the title and search bar
const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
`;

// Responsive grid layout for news cards
const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

/* --- Component --- */

export default function Home() {
  const [news, setNews] = useState<Article[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Re-fetch news whenever the selected category changes
  useEffect(() => {
    fetchNews();
  }, [category]);

  // Fetch articles from the news API endpoint filtered by the current category
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/news?category=${category}`);
      const data = await res.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Today&apos;s News</Title>
        <SearchBar />
      </Header>
      {/* Category filter tabs */}
      <CategoryTabs activeCategory={category} onCategoryChange={setCategory} />
      {/* Loading state or news grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <NewsGrid>
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </NewsGrid>
      )}
    </Container>
  );
}
