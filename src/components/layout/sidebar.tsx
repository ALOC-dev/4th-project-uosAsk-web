'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import SearchModal from '../modal/searchModal';
import { useRecentNotices } from '@/services/notice/useRecentNotices';

const SidebarContainer = styled.aside`
  width: 225px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  padding: 0;
  z-index: 1000;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => `${theme.spacing.xs} -${theme.spacing.md}`};
  padding: ${({ theme }) => `0 ${theme.spacing.md}`};
`;

const LogoIcon = styled.div`
  width: 53px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  img {
    object-fit: cover;
  }
`;

const LogoText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.08em;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${({ theme }) => theme.spacing.xl});
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0 auto;
`;

const NavItem = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.backgroundTertiary : 'transparent'};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  }
`;

const NavIcon = styled.div<{ isActive?: boolean }>`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  filter: ${({ isActive }) =>
    isActive ? 'saturate(1.5) brightness(1.1)' : 'saturate(1)'};
  transition:
    opacity 0.2s,
    filter 0.2s;

  ${NavItem}:hover & {
    opacity: 1;
    filter: saturate(1.3) brightness(1.05);
  }

  img {
    transition: filter 0.2s;
  }
`;

const NavText = styled.span<{ isActive?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => (theme.fontSizes.base === '1rem' ? 600 : 800)};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.navTextActive : theme.colors.textSecondary};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const HistoryItemWrapper = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

const HistoryItem = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
  letter-spacing: -0.08em;
  line-height: 1.4;
  cursor: pointer;
  position: relative;

  /* 자동 truncate 처리 */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  max-width: 100%;
  white-space: nowrap;

  &:hover {
    opacity: 1;
  }
`;

const HistoryItemExpanded = styled.div<{ isVisible: boolean }>`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  letter-spacing: -0.08em;
  line-height: 1.4;
  white-space: nowrap;
  z-index: 1001;
  border-radius: ${({ theme }) => theme.radii.md};
  pointer-events: none;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  padding-right: ${({ theme }) => theme.spacing.xs};
`;

const Divider = styled.div`
  width: calc(100% - ${({ theme }) => theme.spacing.xl});
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.sm} auto;
`;

interface SidebarProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

// 섹션별 라우트 매핑
const ROUTE_MAP: Record<string, string> = {
  chatbot: '/',
  general: '/general',
  academic: '/academic',
  department: '/department',
  search: '/search',
};

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { recent } = useRecentNotices();

  const handleNavClick = (section: string) => {
    // 검색 모달 처리
    if (section === 'search') {
      setIsSearchModalOpen(true);
      return;
    }

    // onNavigate 콜백이 있으면 호출 (하위 호환성)
    if (onNavigate) {
      onNavigate(section);
    }

    // 라우팅 처리
    const route = ROUTE_MAP[section];
    if (route) {
      router.push(route);
    }
  };

  const handleMouseEnter = (
    itemId: string,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top,
      left: rect.left,
    });
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <SidebarContainer>
      <SidebarContent>
        <LogoSection>
          <LogoIcon>
            <Image
              src='/images/main-logo.svg'
              alt='시누공 로고'
              width={53}
              height={53}
              priority
            />
          </LogoIcon>
          <LogoText>시누공</LogoText>
        </LogoSection>

        <Divider />

        <NavSection>
          <NavItem
            isActive={activeSection === 'chatbot'}
            onClick={() => handleNavClick('chatbot')}
          >
            <NavIcon isActive={activeSection === 'chatbot'}>
              <Image
                src='/images/chatBot-icon.svg'
                alt='채팅봇'
                width={30}
                height={30}
              />
            </NavIcon>
            <NavText isActive={activeSection === 'chatbot'}>채팅봇</NavText>
          </NavItem>

          <NavItem
            isActive={activeSection === 'general'}
            onClick={() => handleNavClick('general')}
          >
            <NavIcon isActive={activeSection === 'general'}>
              <Image
                src='/images/general-icon.svg'
                alt='일반공지'
                width={35}
                height={35}
              />
            </NavIcon>
            <NavText isActive={activeSection === 'general'}>일반공지</NavText>
          </NavItem>

          <NavItem
            isActive={activeSection === 'academic'}
            onClick={() => handleNavClick('academic')}
          >
            <NavIcon isActive={activeSection === 'academic'}>
              <Image
                src='/images/department-icon.svg'
                alt='학사공지'
                width={35}
                height={35}
              />
            </NavIcon>
            <NavText isActive={activeSection === 'academic'}>학사공지</NavText>
          </NavItem>

          <NavItem
            isActive={activeSection === 'department'}
            onClick={() => handleNavClick('department')}
          >
            <NavIcon isActive={activeSection === 'department'}>
              <Image
                src='/images/academic-icon.svg'
                alt='학과공지'
                width={35}
                height={35}
              />
            </NavIcon>
            <NavText isActive={activeSection === 'department'}>
              학과공지
            </NavText>
          </NavItem>

          <NavItem onClick={() => handleNavClick('search')}>
            <NavIcon>
              <Image
                src='/images/search-icon.svg'
                alt='공지검색'
                width={22}
                height={22}
              />
            </NavIcon>
            <NavText>공지검색</NavText>
          </NavItem>
        </NavSection>

        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
        />

        <Divider />

        <SectionTitle>최근 본 공지</SectionTitle>
        <HistoryList>
          {recent.map((item) => (
            <HistoryItemWrapper key={item.link}>
              <HistoryItem
                onClick={() => item.link && window.open(item.link, '_blank')}
                onMouseEnter={(e) => handleMouseEnter(item.link, e)}
                onMouseLeave={handleMouseLeave}
              >
                {item.title}
              </HistoryItem>
              <HistoryItemExpanded
                isVisible={hoveredItem === item.link}
                style={{
                  top: `${tooltipPosition.top}px`,
                  left: `${tooltipPosition.left}px`,
                }}
              >
                {item.title}
              </HistoryItemExpanded>
            </HistoryItemWrapper>
          ))}
        </HistoryList>
      </SidebarContent>
    </SidebarContainer>
  );
}
