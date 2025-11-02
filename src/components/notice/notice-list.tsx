'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { NoticeApiResponse } from '@/types/notice';
import { useState, useEffect } from 'react';
import { HotNoticeItem } from './hot-notice-item';

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
  margin-top: ${({ theme }) => theme.spacing.sm};
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox 스크롤바 숨기기 */
  scrollbar-width: none;
`;

const NoticeItem = styled.div`
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
  position: relative;

  animation: ${fadeInUp} 0.3s ease-out forwards;
  opacity: 1;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NoticeTitle = styled.h3`
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
  opacity: 1;
`;

const NoticeInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
  opacity: 1;
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
  noticeData?: NoticeApiResponse;
}

export function AnimatedNoticeList({ noticeData }: AnimatedNoticeListProps) {
  const [isVisible, setIsVisible] = useState(false);

  // 백엔드 API 응답 구조에서 hot과 content 추출
  const hotNotices = noticeData?.hot || [];
  const contentNotices = noticeData?.content || [];
  const allNotices = [...hotNotices, ...contentNotices];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [noticeData]);

  const handleNoticeClick = (notice: NoticeApiResponse['hot'][0]) => {
    if (notice.link) {
      window.open(notice.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) {
    return <NoticeListContainer />;
  }

  if (allNotices.length === 0) {
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
      {/* Hot 공지사항 (카드 스타일) */}
      {hotNotices.map((notice, index) => (
        <HotNoticeItem key={`hot-${notice.title}-${index}`} notice={notice} />
      ))}

      {/* 일반 공지사항 (리스트 스타일) */}
      {contentNotices.map((notice, index) => (
        <NoticeItem
          key={`${notice.title}-${index}`}
          onClick={() => handleNoticeClick(notice)}
        >
          <NoticeTitle>{notice.title}</NoticeTitle>
          <NoticeInfo>
            <NoticeDepartment>{notice.department}</NoticeDepartment>
            <NoticeDate>{notice.postedDate}</NoticeDate>
            <NoticeClickCount>{notice.viewCount} 조회</NoticeClickCount>
          </NoticeInfo>
        </NoticeItem>
      ))}
    </NoticeListContainer>
  );
}
