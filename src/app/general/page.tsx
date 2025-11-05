'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { CATEGORIES } from '@/constants';
import { getNoticeList } from '@/services/notice/getNoticeList';
import { NoticeApiResponse } from '@/types/notice';
import { useEffect, useState, useCallback } from 'react';

export default function GeneralPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [accumulatedNotices, setAccumulatedNotices] =
    useState<NoticeApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 공지사항 데이터 가져오기
  const fetchNotices = useCallback(
    async (page: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await getNoticeList({
        category: CATEGORIES[0],
        keyword: '',
        page,
        exact: false,
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
    } catch (e: any) {
      console.error('❌ [일반공지] 공지사항 로드 실패:', e);
      if (e.response?.status === 429) {
        console.error('⚠️ 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
    },
    [isLoading],
  );

  // 초기 로드
  useEffect(() => {
    fetchNotices(0);
  }, []);

  // 다음 페이지 로드 핸들러
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotices(nextPage);
    }
  }, [currentPage, isLoading, hasMore, fetchNotices]);

  return (
    <NoticeLayout type='general'>
      {accumulatedNotices && (
        <AnimatedNoticeList
          noticeData={accumulatedNotices}
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      )}
    </NoticeLayout>
  );
}
