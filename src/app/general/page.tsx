'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { CATEGORIES } from '@/constants';
import { getNoticeList } from '@/services/notice/getNoticeList';
import { NoticeApiResponse } from '@/types/notice';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function GeneralPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [accumulatedNotices, setAccumulatedNotices] =
    useState<NoticeApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const lastRequestTimeRef = useRef<number>(0);

  // 공지사항 데이터 가져오기
  const fetchNotices = useCallback(async (page: number) => {
    if (isLoading) return;

    // 요청 간격 제한 (최소 500ms)
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTimeRef.current;
    if (timeSinceLastRequest < 500) {
      console.log('⏱️ [일반공지] 요청 간격 제한 (500ms)');
      return;
    }
    lastRequestTimeRef.current = now;

    console.log(`📄 [일반공지] 페이지 ${page} 로드 시작...`);
    setIsLoading(true);
    try {
      const response = await getNoticeList({
        category: CATEGORIES[0],
        keyword: '',
        page,
        exact: false,
      });

      const newData = response.data ?? response;
      console.log(`✅ [일반공지] 페이지 ${page} 로드 완료:`, {
        hot: newData.hot.length,
        content: newData.content.length,
        totalPages: newData.totalPages,
        hasNext: newData.hasNext,
      });

      setAccumulatedNotices((prev) => {
        if (!prev) {
          // 첫 페이지 (page=0): hot 3개 + content 15개
          console.log('🎯 [일반공지] 첫 페이지 로드:', {
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
          console.log('📚 [일반공지] 데이터 누적:', {
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
        console.log('🏁 [일반공지] 마지막 페이지 도달');
      }
    } catch (e: any) {
      console.error('❌ [일반공지] 공지사항 로드 실패:', e);
      if (e.response?.status === 429) {
        console.error('⚠️ 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // 초기 로드
  useEffect(() => {
    fetchNotices(0);
  }, []);

  // 다음 페이지 로드
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotices(nextPage);
    }
  }, [currentPage, isLoading, hasMore, fetchNotices]);

  // Intersection Observer 설정
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '100px', // 100px 전에 미리 로드
        threshold: 0.1,
      },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoading]);

  return (
    <NoticeLayout type='general'>
      {accumulatedNotices && (
        <AnimatedNoticeList noticeData={accumulatedNotices} />
      )}
      <div ref={loadMoreRef} />
    </NoticeLayout>
  );
}
