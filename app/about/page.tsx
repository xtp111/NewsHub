"use client";
import Link from "next/link";
import styled from "styled-components";

const Main = styled.main`
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #4b5563;
  margin-bottom: 2rem;
`;

const TechBox = styled.div`
  background-color: #eff6ff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const TechTitle = styled.h2`
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
`;

const TechList = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  color: #1e40af;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #1e40af;
  }
`;

export default function AboutPage() {
    return (
        <Main>
            <Card>
                <Title>About This Project</Title>

                <Content>
                    <p>
                        This is a demonstration of how to safely hide an API key in a Next.js app
                        using Server Actions.
                    </p>
                    <p>
                        The API key is stored in environment variables and only accessed on the server side,
                        keeping it secure from the client.
                    </p>
                </Content>

                <TechBox>
                    <TechTitle>Technologies Used:</TechTitle>
                    <TechList>
                        <li>Next.js 16</li>
                        <li>React 19</li>
                        <li>TypeScript</li>
                        <li>Styled Components</li>
                        <li>Harvard Art Museums API</li>
                    </TechList>
                </TechBox>

                <StyledLink href="/">
                    ← Go back home
                </StyledLink>
            </Card>
        </Main>
    );
}
