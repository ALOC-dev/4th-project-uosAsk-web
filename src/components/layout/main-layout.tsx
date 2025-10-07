'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { Sidebar } from './sidebar';
import { Header } from './header';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.colors.background};
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 275px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  padding-left: ${theme.spacing['xl']};
  padding-right: ${theme.spacing['xl']};
  padding-top: ${theme.spacing['sm']};
  padding-bottom: ${theme.spacing['xl']};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1262px;
  height: 100%;
  background-color: ${theme.colors.contentContainer};
  border-radius: ${theme.radii.lg};
  padding: ${theme.spacing['2xl']};
  box-sizing: border-box;
  overflow: hidden;
`;

interface MainLayoutProps {
  children: ReactNode;
  activeSection?: string;
  onNavigate?: (section: string) => void;
  onNewChat?: () => void;
}

export function MainLayout({
  children,
  activeSection,
  onNavigate,
  onNewChat,
}: MainLayoutProps) {
  return (
    <LayoutContainer>
      <Sidebar activeSection={activeSection} onNavigate={onNavigate} />
      <MainContent>
        <Header onNewChat={onNewChat} />
        <ContentArea>
          <ContentContainer>{children}</ContentContainer>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
}
