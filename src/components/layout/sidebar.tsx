'use client';

import Image from 'next/image';
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

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs} -${theme.spacing.md};
  padding: ${0} ${theme.spacing.md};
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
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.textSecondary};
  letter-spacing: -0.08em;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${theme.spacing.xl});
  gap: ${theme.spacing.xs};
  margin: 0 auto;
`;

const NavItem = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.sm};
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
  opacity: 1;

  ${NavItem}:hover & {
    opacity: 1;
  }
`;

const NavText = styled.span<{ isActive?: boolean }>`
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontSizes.base === '1rem' ? 600 : 800};
  color: ${theme.colors.textSecondary};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes.sm};
  font-weight: 700;
  color: ${theme.colors.primary};
  padding: 0 ${theme.spacing.lg};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
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
  margin: ${theme.spacing.sm} auto;
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
        <LogoSection>
          <LogoIcon>
            <Image
              src='/images/mainLogo.png'
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
            <NavIcon>
              <Image
                src='/images/chatBot-icon.png'
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
            <NavIcon>
              <Image
                src='/images/general-icon.png'
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
            <NavIcon>
              <Image
                src='/images/academic-icon.png'
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
            <NavIcon>
              <Image
                src='/images/department-icon.png'
                alt='학과공지'
                width={35}
                height={35}
              />
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
              <Image
                src='/images/search-icon.png'
                alt='공지검색'
                width={22}
                height={22}
              />
            </NavIcon>
            <NavText isActive={activeSection === 'search'}>공지검색</NavText>
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
