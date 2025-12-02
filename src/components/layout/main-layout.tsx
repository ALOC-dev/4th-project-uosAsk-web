'use client';

import { ReactNode, useState, useEffect } from 'react';
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0;
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`;

export const OpenSidebarButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  border: 0.5px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.textSecondary};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 0;
  }
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
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    window.innerWidth > 640,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setIsSidebarVisible(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <MainContent isSidebarVisible={isSidebarVisible}>
        <Header
          onNewChat={onNewChat}
          onSettingsClick={handleOpenSettings}
          isSidebarVisible={isSidebarVisible}
          onOpenSidebar={handleToggleSidebar}
        />
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
