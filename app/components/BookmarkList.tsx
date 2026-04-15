"use client";

import Link from "next/link";
import { useBookmarks } from "@/context/BookmarkContext";
import styled from "styled-components";
import type { BookmarkData } from "@/types";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const Content = styled.div`
  padding: 16px;
`;

const Category = styled.span`
  font-size: 12px;
  color: #0066cc;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 8px 0;
  line-height: 1.4;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #999;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #e74c3c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e74c3c;
    color: #fff;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px;
  color: #999;
  grid-column: 1 / -1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
`;

export default function BookmarkList({
  bookmarks,
}: {
  bookmarks: BookmarkData[];
}) {
  const { removeBookmark } = useBookmarks();

  if (bookmarks.length === 0) {
    return <EmptyState>No bookmarked articles yet</EmptyState>;
  }

  return (
    <Container>
      {bookmarks.map((bookmark) => (
        <Card key={bookmark._id}>
          <DeleteButton
            onClick={() => removeBookmark(bookmark._id)}
            title="Remove bookmark"
          >
            &times;
          </DeleteButton>
          <StyledLink href={`/article/${bookmark.articleId}`}>
            <ImageWrapper>
              {bookmark.imageUrl ? "Image" : "No Image"}
            </ImageWrapper>
            <Content>
              <Category>{bookmark.category}</Category>
              <Title>{bookmark.title}</Title>
              <Meta>
                {bookmark.author} &middot;{" "}
                {new Date(bookmark.publishedAt).toLocaleDateString("en-US")}
              </Meta>
            </Content>
          </StyledLink>
        </Card>
      ))}
    </Container>
  );
}
