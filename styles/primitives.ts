import styled from 'styled-components';
import Link from 'next/link';

export const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.maxWidths.lg};
  margin: 0 auto;
  padding: 0 24px;
`;

export const Main = styled.main`
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem;
`;

export const AuthCard = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.authCard};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  padding: 2rem;
`;

export const AuthTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const AuthSubtitle = styled.p`
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const TextInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem 1rem;
  outline: none;
  font-size: 1rem;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: var(--color-text-inverse);
  padding: 0.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceMuted};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorBox = styled.div`
  background-color: ${({ theme }) => theme.colors.dangerBg};
  border: 1px solid ${({ theme }) => theme.colors.dangerBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0;
`;

export const SuccessBox = styled.div`
  background-color: var(--color-info-bg);
  border: 1px solid var(--color-info-border);
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const SuccessText = styled.p`
  color: var(--color-info);
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  color: var(--color-text-subtle);
  font-size: 0.875rem;
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

export const BrandLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-subtle);
  text-align: center;
  margin-top: 1.5rem;
`;
