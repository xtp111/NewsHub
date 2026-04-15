"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { BookmarkProvider } from "@/context/BookmarkContext";
import GlobalStyles from "@/styles/GlobalStyles";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined")
    return (
      <BookmarkProvider>
        <GlobalStyles />
        {children}
      </BookmarkProvider>
    );

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <BookmarkProvider>
        <GlobalStyles />
        {children}
      </BookmarkProvider>
    </StyleSheetManager>
  );
}
