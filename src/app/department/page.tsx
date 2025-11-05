'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { getUserSettings } from '@/data/user-settings';
import { getNoticeList } from '@/services/notice/getNoticeList';
import { NoticeApiResponse } from '@/types/notice';
import type { Department } from '@/constants/department';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.xl}`};
  gap: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  min-height: 400px;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  opacity: 0.8;

  img {
    filter: brightness(0.8) contrast(1.2) saturate(1.3);
  }
`;

const Message = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const MessageTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  letter-spacing: -0.02em;
`;

const MessageDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 400;
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textTertiary};
`;

const SettingsHint = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  img {
    opacity: 0.6;
  }
`;

export default function DepartmentPage() {
  const [hasSettings, setHasSettings] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [accumulatedNotices, setAccumulatedNotices] =
    useState<NoticeApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const departmentRef = useRef<Department | null>(null);

  // 공지사항 데이터 가져오기
  const fetchNotices = useCallback(
    async (page: number) => {
      if (isLoading || !departmentRef.current) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getNoticeList({
          department: [departmentRef.current],
          keyword: '',
          page,
          exact: true,
        });

        const newData = response.data ?? response;

        setAccumulatedNotices((prev) => {
          if (!prev) {
            // 첫 페이지 (page=0): hot 3개 + content 15개
            return newData;
          } else {
            // 이후 페이지: content만 누적 (hot은 비어있음)
            const accumulated = {
              ...newData,
              hot: prev.hot, // 첫 페이지의 HOT 공지 유지
              content: [...prev.content, ...newData.content], // 기존 + 새 데이터
            };
            return accumulated;
          }
        });

        // 더 이상 불러올 데이터가 없는지 확인
        setHasMore(newData.hasNext);
      } catch (err: any) {
        console.error('❌ [학과공지] 공지사항 로드 실패:', err);
        if (err.response?.status === 429) {
          setError('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError('공지사항을 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  // 초기 로드 및 설정 변경 감지
  useEffect(() => {
    const settings = getUserSettings();

    if (!settings) {
      setHasSettings(false);
      setAccumulatedNotices(null);
      departmentRef.current = null;
      return;
    }

    setHasSettings(true);
    const department = settings.department as Department;

    // 학과가 변경되지 않았으면 요청하지 않음
    if (departmentRef.current === department && accumulatedNotices) {
      return;
    }

    departmentRef.current = department;

    // 설정이 변경되면 페이지를 초기화하고 다시 로드
    setCurrentPage(0);
    setAccumulatedNotices(null);
    setHasMore(true);
    fetchNotices(0);
  }, [refreshKey]); // fetchNotices 제거

  // 다음 페이지 로드 핸들러
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotices(nextPage);
    }
  }, [currentPage, isLoading, hasMore, fetchNotices]);

  // 설정 변경 감지
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'uosask-settings') {
        setRefreshKey((prev) => prev + 1);
      }
    };

    const handleSettingsChange = () => {
      setRefreshKey((prev) => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('settingsChanged', handleSettingsChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('settingsChanged', handleSettingsChange);
    };
  }, []);

  return (
    <NoticeLayout type='department'>
      {!hasSettings ? (
        <EmptyStateContainer>
          <IconWrapper>
            <Image
              src='/images/setting-icon.svg'
              alt='설정'
              width={50}
              height={50}
            />
          </IconWrapper>
          <Message>
            <MessageTitle>학과 설정이 필요합니다</MessageTitle>
            <MessageDescription>
              학과별 맞춤 공지를 받아보시려면
              <br />
              단과대학과 학과를 설정해주세요
            </MessageDescription>
          </Message>
          <SettingsHint>
            <Image
              src='/images/setting-icon.svg'
              alt='설정'
              width={20}
              height={20}
            />
            <span>우측 상단의 설정 아이콘을 클릭하여 설정할 수 있습니다</span>
          </SettingsHint>
        </EmptyStateContainer>
      ) : error ? (
        <EmptyStateContainer>
          <MessageDescription>{error}</MessageDescription>
        </EmptyStateContainer>
      ) : (
        accumulatedNotices && (
            <AnimatedNoticeList
              key={refreshKey}
              noticeData={accumulatedNotices}
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            hasMore={hasMore}
            />
        )
      )}
    </NoticeLayout>
  );
}
