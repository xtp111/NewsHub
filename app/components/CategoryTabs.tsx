"use client";

import styled from "styled-components";

const TabsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$active ? "#0066cc" : "#e0e0e0")};
  background: ${(props) => (props.$active ? "#0066cc" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#555")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #0066cc;
    color: ${(props) => (props.$active ? "#fff" : "#0066cc")};
  }
`;

const categories = [
  { id: "all", name: "All" },
  { id: "Tech", name: "Tech" },
  { id: "World", name: "World" },
  { id: "Culture", name: "Culture" },
  { id: "Finance", name: "Finance" },
  { id: "Sports", name: "Sports" },
];

export default function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <TabsContainer>
      {categories.map((cat) => (
        <Tab
          key={cat.id}
          $active={activeCategory === cat.id}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.name}
        </Tab>
      ))}
    </TabsContainer>
  );
}
