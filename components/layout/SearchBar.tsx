// Member: Yuchen Bao
// SearchBar: search bar in home & search pages

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";


// Styled Components

// Horizontal flex container for the search input and button
const SearchContainer = styled.div`
  display: flex;
  gap: 0.85rem;
  width: clamp(200px, 80vw, 600px);  // responsive width
`;

// Search text input with focus border highlight
const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-text-disabled);
  }
`;

// Submit button styled with primary blue color
const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-dark);
  }
`;


export default function SearchBar({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`); }}>
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
