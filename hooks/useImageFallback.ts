import { useState } from "react";

export function useImageFallback() {
  const [error, setError] = useState(false);
  return { hasError: error, onError: () => setError(true), reset: () => setError(false) };
}
