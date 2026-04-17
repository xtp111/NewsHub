import styled from 'styled-components';
import Link from 'next/link';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

export const ImageWrapper = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${({ $height }) => $height ?? '180px'};
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardCategory = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 8px 0;
  line-height: 1.4;
`;

export const CardSummary = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  display: block;
`;
