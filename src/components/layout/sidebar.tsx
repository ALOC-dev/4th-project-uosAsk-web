'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const SidebarContainer = styled.aside`
  width: 275px;
  height: 100vh;
  background-color: ${theme.colors.backgroundSecondary};
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  padding: 0;
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg} 0;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const NavItem = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background: ${(props) =>
    props.isActive ? theme.colors.backgroundTertiary : 'transparent'};
  border: none;
  border-radius: ${theme.radii.sm};
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${theme.colors.backgroundTertiary};
  }
`;

const NavIcon = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  opacity: 0.5;

  ${NavItem}:hover & {
    opacity: 1;
  }
`;

const NavText = styled.span<{ isActive?: boolean }>`
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontSizes.base === '1rem' ? 500 : 700};
  color: ${theme.colors.textSecondary};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes.sm};
  font-weight: 700;
  color: ${theme.colors.textSecondary};
  padding: 0 ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: 0 ${theme.spacing.lg};
`;

const HistoryItem = styled.div`
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.textSecondary};
  opacity: 0.5;
  letter-spacing: -0.08em;
  line-height: 1.2;
  cursor: pointer;
  padding: ${theme.spacing.sm} 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    opacity: 1;
  }
`;

const Divider = styled.div`
  width: calc(100% - ${theme.spacing.xl});
  height: 2px;
  background-color: ${theme.colors.border};
  margin: 0 auto;
`;

interface SidebarProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const handleNavClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <SidebarContainer>
      <SidebarContent>
        <NavSection>
          <NavItem
            isActive={activeSection === 'chatbot'}
            onClick={() => handleNavClick('chatbot')}
          >
            <NavIcon>
              <svg
                width='30'
                height='30'
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M22.5 9.5V20.6C22.5 21.8 21.8 22.5 20.6 22.5H9.5C8.3 22.5 7.5 21.8 7.5 20.6V9.5C7.5 8.3 8.3 7.5 9.5 7.5H20.6C21.8 7.5 22.5 8.3 22.5 9.5Z'
                  fill='currentColor'
                />
                <path
                  d='M27.5 4.5V15.1C27.5 16.3 26.8 17 25.6 17H14.5C13.3 17 12.5 16.3 12.5 15.1V4.5C12.5 3.3 13.3 2.5 14.5 2.5H25.6C26.8 2.5 27.5 3.3 27.5 4.5Z'
                  fill='currentColor'
                  opacity='0.5'
                />
              </svg>
            </NavIcon>
            <NavText isActive={activeSection === 'chatbot'}>채팅봇</NavText>
          </NavItem>

          <NavItem
            isActive={activeSection === 'general'}
            onClick={() => handleNavClick('general')}
          >
            <NavIcon>
              <svg
                width='35'
                height='35'
                viewBox='0 0 35 35'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M10.5 14L15.75 19.25L24.5 10.5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </NavIcon>
            <NavText isActive={activeSection === 'general'}>일반공지</NavText>
          </NavItem>

          <NavItem
            isActive={activeSection === 'academic'}
            onClick={() => handleNavClick('academic')}
          >
            <NavIcon>
              <svg
                width='35'
                height='35'
                viewBox='0 0 35 35'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.75 15.75L17.5 29.75L26.25 5.25'
                  stroke='currentColor'
                  strokeWidth='2'
                />
              </svg>
            </NavIcon>
            <NavText isActive={activeSection === 'academic'}>학사공지</NavText>
          </NavItem>

          <NavItem
            isActive={activeSection === 'department'}
            onClick={() => handleNavClick('department')}
          >
            <NavIcon>
              <svg
                width='35'
                height='35'
                viewBox='0 0 35 35'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.75 5.25V21H26.25V5.25'
                  stroke='currentColor'
                  strokeWidth='2'
                />
                <rect
                  x='8.75'
                  y='5.25'
                  width='8.75'
                  height='1.75'
                  fill='currentColor'
                  opacity='0.5'
                />
              </svg>
            </NavIcon>
            <NavText isActive={activeSection === 'department'}>
              학과공지
            </NavText>
          </NavItem>

          <NavItem
            isActive={activeSection === 'search'}
            onClick={() => handleNavClick('search')}
          >
            <NavIcon>
              <svg
                width='22'
                height='22'
                viewBox='0 0 22 22'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='10.53' height='10.53' fill='currentColor' rx='2' />
                <circle cx='11' cy='11' r='11' stroke='white' strokeWidth='3' />
              </svg>
            </NavIcon>
            <NavText isActive={activeSection === 'search'}>공지 검색</NavText>
          </NavItem>
        </NavSection>

        <Divider />

        <SectionTitle>최근 본 공지</SectionTitle>
        <HistoryList>
          <HistoryItem>제 17회 공과대학 창의적 공학...</HistoryItem>
          <HistoryItem>[박물관] 9/26(금) 100주년기념...</HistoryItem>
          <HistoryItem>[교수학습개발센터] 2025학년...</HistoryItem>
        </HistoryList>
      </SidebarContent>
    </SidebarContainer>
  );
}
