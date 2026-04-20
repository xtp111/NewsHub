// Member: Yuchen Bao
// FallbackImage: handling image load errors and fallback state


"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { useImageFallback } from "@/hooks/useImageFallback";

// Wrapper container for the image or fallback text
// Accepts optional height prop and centers content
const Wrapper = styled.div<{ $height?: string }>`
    width: 100%;
    // Full width container
    height: ${({$height}) => $height ?? "180px"};
    background: var(--color-bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-subtle);
    font-size: 14px;
    overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Props for the FallbackImage component
interface FallbackImageProps {
  src?: string | null;
  alt: string;
  height?: string;
}

// Component that displays an image with graceful fallback on error
export default function FallbackImage({ src, alt, height }: FallbackImageProps) {
  const { hasError, onError, reset } = useImageFallback();

  // hasError: whether image failed to load
  // onError: handler for image load failure
  // reset: reset error state when src changes


  // Reset error state whenever image source changes
  useEffect(() => { reset(); }, [src]);

  return (
    <Wrapper $height={height}>
      {src && !hasError ? (
        <Img src={src} alt={alt} onError={onError} />
      ) : (
        "No Image"
      )}
    </Wrapper>
  );
}
