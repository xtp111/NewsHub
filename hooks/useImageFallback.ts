// Member: Yuchen Bao
// Hook for handling image loading fallback state

import { useState } from "react";

// Manages image error state and provides handlers for fallback logic
export function useImageFallback() {
  // Tracks whether image loading has failed
  const [error, setError] = useState(false);
  // Exposes error state and handlers
  return { hasError: error, onError: () => setError(true), reset: () => setError(false) };
}
