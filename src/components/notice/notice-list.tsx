'use client';

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { NoticeApiResponse } from '@/types/notice';
import { useState, useEffect, useRef } from 'react';
import { HotNoticeItem } from './hot-notice-item';
import { addRecentNotice } from '@/services/notice/recentNoticeQueue';

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
  padding-bottom: ${({ theme }) => theme.spacing.md};

  /* 스크롤바 스타일링 - Webkit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    transition: background-color 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.textTertiary};
  }

  /* Firefox 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border} transparent;
`;

const NoticeItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  padding-left: 75px; /* HOT 공지사항과 텍스트 시작 위치 맞춤 */
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

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoadMoreButton = styled.button<{ disabled?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing['3xl']}`};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.backgroundTertiary : theme.colors.primary};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textTertiary : '#FFFFFF'};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 600;
  letter-spacing: -0.02em;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ disabled }) =>
    disabled ? 'none' : '0 2px 8px rgba(64, 140, 255, 0.3)'};
  min-width: 240px;
  height: 48px;

  &:hover:not(:disabled) {
    background-color: #3576e0;
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(64, 140, 255, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(64, 140, 255, 0.3);
  }
`;

interface AnimatedNoticeListProps {
  noticeData?: NoticeApiResponse;
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
}

export function AnimatedNoticeList({
  noticeData,
  onLoadMore,
  isLoading = false,
  hasMore = false,
}: AnimatedNoticeListProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 백엔드 API 응답 구조에서 hot과 content 추출
  const hotNotices = noticeData?.hot || [];
  const contentNotices = noticeData?.content || [];
  const allNotices = [...hotNotices, ...contentNotices];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [noticeData]);

  // 스크롤 끝 감지
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px 여유

      if (isAtBottom && !isScrollEnd) {
        setIsScrollEnd(true);
        // 스크롤 끝에 도달하면 자동으로 다음 페이지 로드
        if (onLoadMore && hasMore && !isLoading) {
          onLoadMore();
        }
      } else if (!isAtBottom && isScrollEnd) {
        // 스크롤을 다시 올렸을 때 상태 초기화
        setIsScrollEnd(false);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [isScrollEnd, onLoadMore, hasMore, isLoading]);

  const handleNoticeClick = (notice: NoticeApiResponse['hot'][0]) => {
    if (notice.link) {
      addRecentNotice({
        title: notice.title,
        link: notice.link,
      });
      window.open(notice.link, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isVisible) {
    return <NoticeListContainer ref={scrollContainerRef} />;
  }

  if (allNotices.length === 0) {
    return (
      <NoticeListContainer ref={scrollContainerRef}>
        <EmptyState>
          <EmptyIcon>📋</EmptyIcon>
          <EmptyText>등록된 공지사항이 없습니다.</EmptyText>
        </EmptyState>
      </NoticeListContainer>
    );
  }

  return (
    <NoticeListContainer ref={scrollContainerRef}>
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

      {/* 더보기 버튼 - onLoadMore가 전달된 경우에만 표시 */}
      {onLoadMore && (
        <LoadMoreContainer>
          <LoadMoreButton onClick={onLoadMore} disabled={isLoading || !hasMore}>
            {isLoading
              ? '로딩 중...'
              : hasMore
                ? '더보기'
                : '마지막 공지사항입니다'}
          </LoadMoreButton>
        </LoadMoreContainer>
      )}
    </NoticeListContainer>
  );
}
