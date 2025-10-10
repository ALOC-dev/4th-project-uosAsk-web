'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import { NoticeType } from '@/types/notice';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const HeaderTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  letter-spacing: -0.02em;
`;

const HeaderSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  margin-left: auto;
`;

interface NoticeHeaderProps {
  type: NoticeType;
  count?: number;
}

const NOTICE_CONFIG = {
  general: {
    title: '일반공지',
    icon: '/images/general-icon.png',
    description: '전체 공지사항',
  },
  academic: {
    title: '학사공지',
    icon: '/images/academic-icon.png',
    description: '학사 관련 공지',
  },
  department: {
    title: '학과공지',
    icon: '/images/department-icon.png',
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
          width={24}
          height={24}
        />
      </IconWrapper>
      <HeaderTitle>{config.title}</HeaderTitle>
      {count !== undefined && <HeaderSubtitle>{count}개의 공지</HeaderSubtitle>}
    </HeaderContainer>
  );
}
