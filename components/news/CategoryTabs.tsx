// Member: Yuchen Bao
// CategoryTabs: tabs showing news categories on home page, under the search box.

import styled from "styled-components";

// Styled Components

// Horizontal flex container for category tabs with wrapping support
const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem;
  flex-wrap: wrap;
`;

// Individual category tab button with active/inactive states
const Tab = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.$active ? "var(--color-primary)" : "var(--color-border)")};
  background: ${(props) => (props.$active ? "var(--color-primary)" : "var(--color-bg)")};
  color: ${(props) => (props.$active ? "var(--color-text-inverse)" : "var(--color-text-subtle)")};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
    color: ${(props) => (props.$active ? "var(--color-text-inverse)" : "var(--color-primary)")};
  }
`;

// Available news categories; "all" fetches top headlines without a filter
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
