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

const NoticeItem = styled.div<{ delay: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-height: 64.5px;
  max-height: 64.5px;
  overflow: hidden;

  animation: ${fadeInUp} 0.5s ease-out forwards;
  animation-delay: ${({ delay }) => delay * 0.1}s;
  opacity: 0;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
      {notices.map((notice, index) => (
        <NoticeItem
          key={notice.id}
          delay={index}
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
      ))}
    </NoticeListContainer>
  );
}
