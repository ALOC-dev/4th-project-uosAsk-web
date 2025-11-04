'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { CATEGORIES } from '@/constants';
import { getNoticeList } from '@/services/notice/getNoticeList';
import { NoticeApiResponse } from '@/types/notice';
import { useEffect, useState, useCallback } from 'react';

export default function AcademicPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [accumulatedNotices, setAccumulatedNotices] =
    useState<NoticeApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 공지사항 데이터 가져오기
  const fetchNotices = useCallback(
    async (page: number) => {
      if (isLoading) return;

      console.log(`📄 [학사공지] 페이지 ${page} 로드 시작...`);
      setIsLoading(true);
      try {
        const response = await getNoticeList({
          category: CATEGORIES[1],
          keyword: '',
          page,
          exact: true,
        });

        const newData = response.data ?? response;
        console.log(`✅ [학사공지] 페이지 ${page} 로드 완료:`, {
          hot: newData.hot.length,
          content: newData.content.length,
          page: newData.page,
          size: newData.size,
          totalElements: newData.totalElements,
          totalPages: newData.totalPages,
          hasNext: newData.hasNext,
          hasPrevious: newData.hasPrevious,
        });
        console.log('📦 [학사공지] 전체 응답 데이터:', newData);

        setAccumulatedNotices((prev) => {
          if (!prev) {
            // 첫 페이지 (page=0): hot 3개 + content 15개
            console.log('🎯 [학사공지] 첫 페이지 로드:', {
              hot: newData.hot.length,
              content: newData.content.length,
            });
            return newData;
          } else {
            // 이후 페이지: content만 누적 (hot은 비어있음)
            const accumulated = {
              ...newData,
              hot: prev.hot, // 첫 페이지의 HOT 공지 유지
              content: [...prev.content, ...newData.content], // 기존 + 새 데이터
            };
            console.log('📚 [학사공지] 데이터 누적:', {
              기존_content: prev.content.length,
              새로운_content: newData.content.length,
              총_content: accumulated.content.length,
            });
            return accumulated;
          }
        });

        // 더 이상 불러올 데이터가 없는지 확인
        setHasMore(newData.hasNext);
        if (!newData.hasNext) {
          console.log('🏁 [학사공지] 마지막 페이지 도달');
        }
      } catch (e: any) {
        console.error('❌ [학사공지] 공지사항 로드 실패:', e);
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
    <NoticeLayout type='academic'>
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
