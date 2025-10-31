'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { useTheme } from '@/components/providers/theme-provider';

const HeaderContainer = styled.header`
  width: 100%;
  height: 90px;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

interface HeaderProps {
  onNewChat?: () => void;
  onSettingsClick?: () => void;
}

export function Header({ onNewChat, onSettingsClick }: HeaderProps) {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderActions>
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
