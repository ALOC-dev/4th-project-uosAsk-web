'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Notice } from '@/types/notice';
import { useState, useEffect } from 'react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const NoticeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox 스크롤바 숨기기 */
  scrollbar-width: none;
`;

const NoticeItem = styled.div<{
  delay: number;
  isTopNotice: boolean;
  rank?: number;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  background-color: ${({ theme, isTopNotice }) =>
    isTopNotice ? theme.colors.backgroundSecondary : 'transparent'};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-height: 64.5px;
  max-height: 64.5px;
  overflow: hidden;
  position: relative;

  animation: ${fadeInUp} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay * 0.1}s;
  opacity: 0;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* 카드 스타일 (상위 3개) */
  ${({ isTopNotice, theme, rank }) =>
    isTopNotice &&
    `
    margin: ${theme.spacing.xs} ${theme.spacing.md};
    border-radius: ${theme.radii.md};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid ${
      rank === 1
        ? theme.colors.primary
        : rank === 2
          ? '#fbbf24'
          : rank === 3
            ? '#fb7185'
            : theme.colors.border
    };
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: ${
        rank === 1
          ? `linear-gradient(90deg, ${theme.colors.primary}, #3b82f6)`
          : rank === 2
            ? 'linear-gradient(90deg, #fbbf24, #f59e0b)'
            : rank === 3
              ? 'linear-gradient(90deg, #fb7185, #f43f5e)'
              : 'transparent'
      };
      border-radius: ${theme.radii.md} ${theme.radii.md} 0 0;
    }
    
    &::after {
      content: '${rank}';
      position: absolute;
      top: ${theme.spacing.xs};
      right: ${theme.spacing.md};
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: ${theme.fontSizes.xs};
      color: white;
      background: ${
        rank === 1
          ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
          : rank === 2
            ? 'linear-gradient(135deg, #fbbf24, #d97706)'
            : rank === 3
              ? 'linear-gradient(135deg, #fb7185, #dc2626)'
              : '#6b7280'
      };
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `}

  &:hover {
    background-color: ${({ theme, isTopNotice }) =>
      isTopNotice
        ? theme.colors.backgroundTertiary
        : theme.colors.backgroundTertiary};
    transform: ${({ isTopNotice }) =>
      isTopNotice ? 'translateY(-2px)' : 'translateX(4px)'};
    box-shadow: ${({ isTopNotice }) =>
      isTopNotice
        ? '0 4px 16px rgba(0, 0, 0, 0.15)'
        : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NoticeTitle = styled.h3<{ isImportant?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  letter-spacing: -0.04em;
  line-height: 1.2;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  animation: ${slideIn} 0.6s ease-out forwards;
  animation-delay: ${({ isImportant }) => (isImportant ? '0.2s' : '0.3s')};
  opacity: 0;
`;

const NoticeInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;

  animation: ${slideIn} 0.6s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
`;

const NoticeDepartment = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
`;

const NoticeDate = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap;
  flex-shrink: 0;
`;

const NoticeClickCount = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: -0.04em;
  line-height: 1.2;
  white-space: nowrap;
  flex-shrink: 0;
  opacity: 0.7;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: ${({ theme }) => theme.spacing.md};

  animation: ${fadeInUp} 0.5s ease-out forwards;
`;

const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  text-align: center;
`;

interface AnimatedNoticeListProps {
  notices: Notice[];
  onNoticeClick?: (notice: Notice) => void;
}

export function AnimatedNoticeList({
  notices,
  onNoticeClick,
}: AnimatedNoticeListProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [notices]);

  // 조회수 기준으로 정렬하여 상위 3개 식별
  const sortedNotices = [...notices].sort(
    (a, b) => b.clickCount - a.clickCount,
  );
  const topNotices = sortedNotices.slice(0, 3);
  const topNoticeIds = topNotices.map((notice) => notice.id);

  // 상위 3개를 제외한 나머지 공지들 (기존 순서 유지)
  const remainingNotices = notices.filter(
    (notice) => !topNoticeIds.includes(notice.id),
  );

  // 최종 순서: 상위 3개 + 나머지 공지들
  const reorderedNotices = [...topNotices, ...remainingNotices];

  const handleNoticeClick = (notice: Notice) => {
    if (onNoticeClick) {
      onNoticeClick(notice);
    }
  };

  if (!isVisible) {
    return <NoticeListContainer />;
  }

  if (notices.length === 0) {
    return (
      <NoticeListContainer>
        <EmptyState>
          <EmptyIcon>📋</EmptyIcon>
          <EmptyText>등록된 공지사항이 없습니다.</EmptyText>
        </EmptyState>
      </NoticeListContainer>
    );
  }

  return (
    <NoticeListContainer>
      {reorderedNotices.map((notice, index) => {
        const isTopNotice = topNoticeIds.includes(notice.id);
        const rank = isTopNotice
          ? topNoticeIds.indexOf(notice.id) + 1
          : undefined;

        return (
          <NoticeItem
            key={notice.id}
            delay={index}
            isTopNotice={isTopNotice}
            rank={rank}
            onClick={() => handleNoticeClick(notice)}
          >
            <NoticeTitle isImportant={notice.isImportant}>
              {notice.title}
            </NoticeTitle>
            <NoticeInfo>
              <NoticeDepartment>{notice.department}</NoticeDepartment>
              <NoticeDate>{notice.date}</NoticeDate>
              <NoticeClickCount>{notice.clickCount} 조회</NoticeClickCount>
            </NoticeInfo>
          </NoticeItem>
        );
      })}
    </NoticeListContainer>
  );
}
