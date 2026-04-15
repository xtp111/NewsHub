/**
 * StyledComponentsRegistry
 *
 * SSR (Server-Side Rendering) registry for styled-components in Next.js App Router.
 * Ensures styled-components styles are collected during server rendering and
 * injected into the HTML before the page is sent to the client.
 *
 * Also wraps the app with:
 * - BookmarkProvider: Global bookmark state context
 * - GlobalStyles: Application-wide CSS reset and base styles
 *
 * On the server: Uses StyleSheetManager to collect styles during rendering.
 * On the client: Renders children directly without the StyleSheetManager.
 */

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
  // Create a ServerStyleSheet instance for collecting styles during SSR
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  // Insert collected styles into the HTML head during server rendering
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // Client-side: render without StyleSheetManager (styles are already in the DOM)
  if (typeof window !== "undefined")
    return (
      <BookmarkProvider>
        <GlobalStyles />
        {children}
      </BookmarkProvider>
    );

  // Server-side: wrap with StyleSheetManager to collect styles during SSR
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <BookmarkProvider>
        <GlobalStyles />
        {children}
      </BookmarkProvider>
    </StyleSheetManager>
  );
}
