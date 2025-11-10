'use client';

import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { Setting } from './setting';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  overflow: hidden;
`;

const MainContent = styled.main<{ isSidebarVisible: boolean }>`
  flex: 1;
  margin-left: ${({ isSidebarVisible }) => (isSidebarVisible ? '225px' : '0')};
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  transition: margin-left 0.3s ease;
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
  position: relative;
`;

const OpenSidebarButton = styled.button<{ isVisible: boolean }>`
  position: fixed;
  left: ${({ isVisible }) => (isVisible ? '-50px' : '16px')};
  top: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  z-index: 999;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1262px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
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
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleOpenSettings = () => setIsSettingsOpen((prev) => !prev);
  const handleCloseSettings = () => setIsSettingsOpen(false);
  const handleChangeSettings = (_payload: {
    university: string;
    department: string;
  }) => {
    // Reserved for propagating selection to app state if needed later
  };
  const handleToggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  return (
    <LayoutContainer>
      <Sidebar
        activeSection={activeSection}
        onNavigate={onNavigate}
        isVisible={isSidebarVisible}
        onToggle={handleToggleSidebar}
      />
      <OpenSidebarButton
        isVisible={isSidebarVisible}
        onClick={handleToggleSidebar}
        aria-label='사이드바 열기'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M9 18l6-6-6-6' />
        </svg>
      </OpenSidebarButton>
      <MainContent isSidebarVisible={isSidebarVisible}>
        <Header onNewChat={onNewChat} onSettingsClick={handleOpenSettings} />
        <Setting
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
