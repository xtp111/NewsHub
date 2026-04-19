"use client";

import { useBookmarks } from "@/context/BookmarkContext";
import BookmarkList from "@/components/layout/BookmarkList";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 16px;
  font-weight: 400;
`;

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <Container>
      <Title>
        My Bookmarks <Count>({bookmarks.length})</Count>
      </Title>
      <BookmarkList bookmarks={bookmarks} />
    </Container>
  );
}
