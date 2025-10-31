'use client';

import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { SettingsDropdown } from './settings-dropdown';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
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
  padding-left: ${({ theme }) => theme.spacing['xl']};
  padding-right: ${({ theme }) => theme.spacing['xl']};
  padding-top: ${({ theme }) => theme.spacing['sm']};
  padding-bottom: ${({ theme }) => theme.spacing['xl']};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1262px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.contentContainer};
  border-radius: ${({ theme }) => theme.radii.lg};
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSettings = () => setIsSettingsOpen((prev) => !prev);
  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleChangeSettings = (_payload: {
    university: string;
    department: string;
  }) => {
    // Reserved for propagating selection to app state if needed later
  };
  return (
    <LayoutContainer>
      <Sidebar activeSection={activeSection} onNavigate={onNavigate} />
      <MainContent>
        <Header onNewChat={onNewChat} onSettingsClick={handleOpenSettings} />
        <SettingsDropdown
          open={isSettingsOpen}
          onClose={handleCloseSettings}
          onChange={handleChangeSettings}
        />
        <ContentArea>
          <ContentContainer>{children}</ContentContainer>
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
}
