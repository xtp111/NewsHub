"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import { BookmarkProvider } from "@/context/BookmarkContext";
import GlobalStyles from "@/styles/GlobalStyles";
import { theme } from "@/styles/theme";

/**
 * StyledRegistry handles styled-components SSR style collection.
 * On the server it wraps children in StyleSheetManager so all styled-component
 * styles (including theme-aware ones from ClientProviders below) are captured
 * and injected into the initial HTML. On the client it renders children as-is.
 */
export function StyledRegistry({ children }: { children: React.ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}

/**
 * ClientProviders supplies app-wide context: theme tokens, bookmark state,
 * and global CSS reset. Must be rendered inside StyledRegistry so the
 * ThemeProvider's styles are collected during SSR.
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <BookmarkProvider>
        <GlobalStyles />
        {children}
      </BookmarkProvider>
    </ThemeProvider>
  );
}
