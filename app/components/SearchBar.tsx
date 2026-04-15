"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  gap: 12px;
  max-width: 600px;
`;

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

export default function SearchBar({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

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
