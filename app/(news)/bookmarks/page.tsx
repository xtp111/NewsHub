// Member: Aiqi Xu
// Bookmarks Page: display user-tailored bookmarked news

"use client";

import { useBookmarks } from "@/context/BookmarkContext";
import { PageContainer, PageTitle } from "@/components/primitives";
import BookmarkList from "@/components/layout/BookmarkList";
import styled from "styled-components";

// Styled component for displaying the number of bookmarks next to the title
const Count = styled.span`
    color: var(--color-text-muted);
    font-size: 1rem;
    font-weight: 400;
`;

export default function BookmarksPage() {
    // Get bookmarked articles from global context
    const { bookmarks } = useBookmarks();

    return (
    <PageContainer>
        <PageTitle>
            My Bookmarks <Count>({bookmarks.length})</Count> {/* Display total number of bookmarks */}
        </PageTitle>
        <BookmarkList bookmarks={bookmarks} />
    </PageContainer>
    );
}
