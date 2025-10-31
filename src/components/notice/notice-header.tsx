'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Image from 'next/image';
import { NoticeType } from '@/types/notice';

const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  animation: ${slideInDown} 0.6s ease-out forwards;
  opacity: 0;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};

  animation: ${fadeInScale} 0.7s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    filter: brightness(0.8) contrast(1.2) saturate(1.3);
  }
`;

const HeaderTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  letter-spacing: -0.02em;

  animation: ${slideInLeft} 0.8s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
`;

const HeaderSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  margin-left: auto;

  animation: ${slideInRight} 0.8s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
`;

interface NoticeHeaderProps {
  type: NoticeType;
  count?: number;
}

const NOTICE_CONFIG = {
  general: {
    title: '일반공지',
    icon: '/images/general-icon.svg',
    description: '전체 공지사항',
  },
  academic: {
    title: '학사공지',
    icon: '/images/academic-icon.svg',
    description: '학사 관련 공지',
  },
  department: {
    title: '학과공지',
    icon: '/images/department-icon.svg',
    description: '학과별 공지사항',
  },
} as const;

export function NoticeHeader({ type, count }: NoticeHeaderProps) {
  const config = NOTICE_CONFIG[type];

  return (
    <HeaderContainer>
      <IconWrapper>
        <Image
          src={config.icon}
          alt={`${config.title} 아이콘`}
          width={40}
          height={40}
        />
      </IconWrapper>
      <HeaderTitle>{config.title}</HeaderTitle>
      {count !== undefined && <HeaderSubtitle>{count}개의 공지</HeaderSubtitle>}
    </HeaderContainer>
  );
}
