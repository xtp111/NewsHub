/**
 * SearchBar Component
 *
 * A simple search form with a text input and submit button.
 * On form submission, navigates to /search?q=<query> using Next.js router.
 * Accepts an optional initialValue prop to pre-fill the input
 * (used on the search results page to show the current query).
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

/* --- Styled Components --- */

// Horizontal flex container for the search input and button
const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  max-width: 600px;
`;

// Search text input with focus border highlight
const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  outline: none;

  &:focus {
    border-color: #0066cc;
  }

  &::placeholder {
    color: #aaa;
  }
`;

// Submit button styled with primary blue color
const Button = styled.button`
  padding: 12px 24px;
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #0052a3;
  }
`;

/* --- Component --- */

export default function SearchBar({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  // Handle form submission: navigate to search page with the query parameter
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <SearchContainer>
        <Input
          type="text"
          placeholder="Search news..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </SearchContainer>
    </form>
  );
}
