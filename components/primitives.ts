// Member: Yuchen Bao
// Primitive styled components

import styled from 'styled-components';
import Link from 'next/link';

export const PageContainer = styled.div`
    margin: 0 auto;
    padding: 2% 4%;
`;

export const PageTitle = styled.h1`
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 1% 1% 2%;
`;

// NewsGrid: grid for NewsCard
export const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
`;

////////////////////////////////////////////////////
// Start of: Auth pages components

export const AuthMain = styled.main`
    max-width: 42rem;
    margin: 0 auto;
    padding: 2rem;
    height: 100%;
`;

export const AuthCard = styled.div`
    background: var(--color-bg);
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    border: 1px solid var(--color-border);
    padding: 2rem;
`;

export const AuthTitle = styled.h1`
    font-size: 1.85rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: 0.5rem;
`;

export const AuthSubtitle = styled.p`
    color: var(--color-text-subtle);
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
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-text);`;

export const TextInput = styled.input`
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    outline: none;
    font-size: 1rem;
    &:focus {
        border-color: var(--color-primary);
    }
`;

export const PrimaryButton = styled.button`
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
    &:hover {
        background-color: var(--color-primary-dark);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const SecondaryButton = styled.button`
    background-color: var(--color-bg);
    color: var(--color-text);
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    border: 1px solid var(--color-border);
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
    width: 100%;
    &:hover {
        background-color: var(--color-bg-subtle);
    }
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const ErrorBox = styled.div`
    background-color: var(--color-danger-bg);
    border: 1px solid var(--color-danger-border);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
`;

export const ErrorText = styled.p`
    color: var(--color-danger);
    font-weight: 500;
    margin: 0;
`;

export const SuccessBox = styled.div`
    background-color: var(--color-info-bg);
    border: 1px solid var(--color-info-border);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
`;

export const SuccessText = styled.p`
    color: var(--color-info);
    font-weight: 500;
    margin: 0;
`;

/* Horizontal Divider Line (for login page) */
export const Divider = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0;
    color: var(--color-text-subtle);
    font-size: 0.85rem;
    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: var(--color-border);
    }
`;

export const FooterText = styled.p`
    font-size: 0.85rem;
    color: var(--color-text-subtle);
    text-align: center;
    margin-top: 1.5rem;
`;

// End of: Auth pages components
////////////////////////////////////////////////////

export const BrandLink = styled(Link)`
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;
    &:hover {
        color: var(--color-primary-dark);
    }
`;