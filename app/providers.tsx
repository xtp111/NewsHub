// Member: Aiqi Xu
// Global client-side providers and styled-components SSR support

"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
// styled-components utilities for collecting and injecting styles during SSR
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
// Global context provider for managing bookmarked articles
import { BookmarkProvider } from "@/context/BookmarkContext";

// StyledRegistry ensures styled-components styles are correctly rendered in SSR
// It collects styles on the server and injects them into the HTML
export function StyledRegistry({ children }: { children: React.ReactNode }) {
  // Create a ServerStyleSheet instance to collect styles during server rendering
  const [sheet] = useState(() => new ServerStyleSheet());

  // Inject collected styles into the HTML during server rendering
  useServerInsertedHTML(() => {
    // Extract style elements from the collected sheet
    const styles = sheet.getStyleElement();
    // Clear the internal sheet to prevent duplicate styles
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  // On the client, no need to wrap with StyleSheetManager
  if (typeof window !== "undefined") return <>{children}</>;

  // On the server, wrap children to collect styled-components styles
  return (
      <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}

// Combines all client-side context providers
export function ClientProviders({ children }: { children: React.ReactNode }) {
  // Wrap app with BookmarkProvider so all components can access bookmark state
  return <BookmarkProvider>{children}</BookmarkProvider>;
}