'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const HeaderContainer = styled.header`
  width: 100%;
  height: 85px;
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  padding: 0 ${theme.spacing['2xl']};
  position: relative;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const LogoImage = styled.div`
  width: 53px;
  height: 53px;
  border-radius: 50%;
  background-color: ${theme.colors.backgroundTertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LogoText = styled.h1`
  font-family: ${theme.fonts.sans};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${theme.colors.textTertiary};
  letter-spacing: -0.08em;
  line-height: 1.2;
  margin: 0;
`;

const HeaderActions = styled.div`
  margin-left: auto;
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

const HeaderDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  height: 2px;
  background-color: ${theme.colors.border};
`;

interface HeaderProps {
  onNewChat?: () => void;
}

export function Header({ onNewChat }: HeaderProps) {
  return (
    <HeaderContainer>
      <LogoSection>
        <LogoImage>{/* 로고 이미지를 여기에 추가할 수 있습니다 */}</LogoImage>
        <LogoText>시누공</LogoText>
      </LogoSection>

      <HeaderActions>
        <NewChatButton onClick={onNewChat}>
          <EditIcon>
            <svg
              width='28'
              height='28'
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g>
                <path
                  d='M4 24L10 22L24 8C25.1 6.9 25.1 5.1 24 4C22.9 2.9 21.1 2.9 20 4L6 18L4 24Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M18 6L22 10'
                  fill='currentColor'
                  opacity='0.5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </svg>
          </EditIcon>
          <ButtonText>새 채팅</ButtonText>
        </NewChatButton>
      </HeaderActions>

      <HeaderDivider />
    </HeaderContainer>
  );
}
