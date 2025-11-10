'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { useTheme } from '@/components/providers/theme-provider';
import { useState } from 'react';
import { OpenSidebarButton } from './main-layout';

const HeaderContainer = styled.header`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing['2xl']};
  position: relative;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 48px;
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
`;

const ButtonText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const SettingButton = styled.div`
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const ThemeButton = styled.button`
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
`;

const HelpButtonContainer = styled.div`
  position: relative;
`;

const HelpButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
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
`;

const HelpTooltip = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: calc(100% + 12px);
  left: -500%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.backgroundButton};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  white-space: normal;
  z-index: 1001;
  width: 700px;
  line-height: 1.5;
  text-align: left;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.2s ease;

  /* 말풍선 꼬리 (버튼 중앙에 고정) */
  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 614px; /* 툴팁 이동 보정(-240px - 350px) + 버튼 중앙(24px) = 614px */
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.colors.border};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 614px; /* 툴팁 이동 보정(-240px - 350px) + 버튼 중앙(24px) = 614px */
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid ${({ theme }) => theme.colors.backgroundButton};
    margin-bottom: -1px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 320px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.md};
  }
`;

interface HeaderProps {
  onNewChat?: () => void;
  onSettingsClick?: () => void;
  isSidebarVisible?: boolean;
  onOpenSidebar?: () => void;
}

export function Header({
  onNewChat,
  onSettingsClick,
  isSidebarVisible = true,
  onOpenSidebar,
}: HeaderProps) {
  const { themeMode, toggleTheme } = useTheme();
  const [isHelpTooltipOpen, setIsHelpTooltipOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHelpTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHelpTooltipOpen(false);
  };

  return (
    <HeaderContainer>
      <div>
        {!isSidebarVisible && onOpenSidebar && (
          <OpenSidebarButton onClick={onOpenSidebar} aria-label='사이드바 열기'>
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
        )}
      </div>
      <HeaderActions>
        <HelpButtonContainer
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <HelpButton>
            <Image
              src='/images/question-icon.svg'
              alt='도움말'
              width={28}
              height={28}
            />
          </HelpButton>
          <HelpTooltip isVisible={isHelpTooltipOpen}>
            시누공은 공지사항에 대해 QnA를 할 수 있는 채팅 기능이 있어요.
            <br />
            대화 중{' '}
            <span style={{ fontWeight: 700 }}>
              이전 대화와 다른 주제로 질문
            </span>
            하거나{' '}
            <span style={{ fontWeight: 700 }}>질문의 답변이 부정확한</span> 경우{' '}
            <span style={{ fontWeight: 700 }}>새 채팅</span>을 눌러서 다시
            질문해주세요.
          </HelpTooltip>
        </HelpButtonContainer>

        <NewChatButton onClick={onNewChat}>
          <SettingButton>
            <Image
              src='/images/newChat-icon.svg'
              alt='새 채팅'
              width={28}
              height={28}
            />
          </SettingButton>
          <ButtonText>새 채팅</ButtonText>
        </NewChatButton>

        <ThemeButton onClick={onSettingsClick} aria-label='설정'>
          <Image
            src='/images/setting-icon.svg'
            alt='설정'
            width={28}
            height={28}
          />
        </ThemeButton>

        <ThemeButton onClick={toggleTheme} aria-label='테마 전환'>
          <Image
            src={
              themeMode === 'night'
                ? '/images/night-icon.svg'
                : '/images/day-icon.svg'
            }
            alt='테마 전환'
            width={28}
            height={28}
          />
        </ThemeButton>
      </HeaderActions>
    </HeaderContainer>
  );
}
