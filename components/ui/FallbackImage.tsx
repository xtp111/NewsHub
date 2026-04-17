"use client";

import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${({ $height }) => $height ?? "180px"};
  background: #f0f0f0;
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
  const [error, setError] = useState(false);

  return (
    <Wrapper $height={height}>
      {src && !error ? (
        <Img src={src} alt={alt} onError={() => setError(true)} />
      ) : (
        "No Image"
      )}
    </Wrapper>
  );
}
