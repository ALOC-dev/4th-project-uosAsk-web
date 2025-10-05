'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const HeaderContainer = styled.header`
  width: 100%;
  height: 85px;
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${theme.spacing['2xl']};
  position: relative;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background-color: ${theme.colors.background};
  border: 0.5px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.sm};
  box-shadow: ${theme.shadows.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.textSecondary};
  letter-spacing: -0.08em;
  line-height: 1.2;
`;

const EditIcon = styled.div`
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
`;

const IconButton = styled.button`
  width: 53px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
  border: 0.5px solid ${theme.colors.borderLight};
  border-radius: ${theme.radii.sm};
  box-shadow: ${theme.shadows.md};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface HeaderProps {
  onNewChat?: () => void;
  onSettingsClick?: () => void;
  onThemeToggle?: () => void;
}

export function Header({
  onNewChat,
  onSettingsClick,
  onThemeToggle,
}: HeaderProps) {
  return (
    <HeaderContainer>
      <HeaderActions>
        <NewChatButton onClick={onNewChat}>
          <EditIcon>
            <Image
              src='/images/newChat-icon.png'
              alt='새 채팅'
              width={28}
              height={28}
            />
          </EditIcon>
          <ButtonText>새 채팅</ButtonText>
        </NewChatButton>

        <IconButton onClick={onSettingsClick} aria-label='설정'>
          <Image
            src='/images/setting-icon.png'
            alt='설정'
            width={28}
            height={28}
          />
        </IconButton>

        <IconButton onClick={onThemeToggle} aria-label='테마 전환'>
          <Image
            src='/images/day-icon.png'
            alt='테마 전환'
            width={28}
            height={28}
          />
        </IconButton>
      </HeaderActions>
    </HeaderContainer>
  );
}
