"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { useImageFallback } from "@/hooks/useImageFallback";

const Wrapper = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${({ $height }) => $height ?? "180px"};
  background: var(--color-bg-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface FallbackImageProps {
  src?: string | null;
  alt: string;
  height?: string;
}

export default function FallbackImage({ src, alt, height }: FallbackImageProps) {
  const { hasError, onError, reset } = useImageFallback();

  useEffect(() => { reset(); }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

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
