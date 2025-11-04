'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { NoticeApiResponse } from '@/types/notice';
import { getNoticeList } from '@/services/notice/getNoticeList';

const SearchResultContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SearchInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const SearchKeyword = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.02em;
`;

const SearchCount = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.md};
  letter-spacing: -0.02em;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.xl}`};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
`;

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(0);
  const [accumulatedNotices, setAccumulatedNotices] =
    useState<NoticeApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 공지사항 데이터 가져오기
  const fetchNotices = useCallback(
    async (page: number) => {
      if (isLoading || !query || !query.trim()) return;

      console.log(`🔍 [검색] 페이지 ${page} 로드 시작...`);
      setIsLoading(true);
      setError(null);

      try {
        const response = await getNoticeList({
          keyword: query.trim(),
          page,
          exact: false,
        });

        const newData = response.data ?? response;
        console.log(`✅ [검색] 페이지 ${page} 로드 완료:`, {
          hot: newData.hot.length,
          content: newData.content.length,
          page: newData.page,
          size: newData.size,
          totalElements: newData.totalElements,
          totalPages: newData.totalPages,
          hasNext: newData.hasNext,
          hasPrevious: newData.hasPrevious,
        });

        setAccumulatedNotices((prev) => {
          if (!prev) {
            // 첫 페이지 (page=0): hot 3개 + content 15개
            console.log('🎯 [검색] 첫 페이지 로드:', {
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
            console.log('📚 [검색] 데이터 누적:', {
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
          console.log('🏁 [검색] 마지막 페이지 도달');
        }
      } catch (e: any) {
        console.error('❌ [검색] 공지사항 로드 실패:', e);
        if (e.response?.status === 429) {
          setError('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, query],
  );

  // 초기 로드 및 검색어 변경 감지
  useEffect(() => {
    if (!query || !query.trim()) {
      setAccumulatedNotices(null);
      return;
    }

    // 검색어가 변경되면 페이지를 초기화하고 다시 로드
    setCurrentPage(0);
    setAccumulatedNotices(null);
    setHasMore(true);
    fetchNotices(0);
  }, [query]); // fetchNotices는 의존성에서 제외

  // 다음 페이지 로드 핸들러
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotices(nextPage);
    }
  }, [currentPage, isLoading, hasMore, fetchNotices]);

  return (
    <NoticeLayout
      type='search'
      icon='/images/search-icon.svg'
      title={query || '검색결과'}
    >
      {!query || !query.trim() ? (
        <SearchResultContainer>
          <NoResultsMessage>
            검색어를 입력해주세요
            <br />
            사이드바의 공지검색을 클릭하여 검색할 수 있습니다
          </NoResultsMessage>
        </SearchResultContainer>
      ) : error ? (
        <SearchResultContainer>
          <NoResultsMessage>{error}</NoResultsMessage>
        </SearchResultContainer>
      ) : accumulatedNotices ? (
        <>
          {accumulatedNotices.totalElements > 0 && (
            <SearchResultContainer>
              <SearchInfo>
                <SearchKeyword>{query}</SearchKeyword>
                <SearchCount>
                  {accumulatedNotices.totalElements}개의 공지사항을 찾았습니다
                </SearchCount>
              </SearchInfo>
            </SearchResultContainer>
          )}
          <AnimatedNoticeList
            noticeData={accumulatedNotices}
            onLoadMore={handleLoadMore}
            isLoading={isLoading}
            hasMore={hasMore}
          />
        </>
      ) : (
        <SearchResultContainer>
          <NoResultsMessage>
            "{query}"에 대한 검색 결과가 없습니다
            <br />
            다른 검색어로 시도해보세요
          </NoResultsMessage>
        </SearchResultContainer>
      )}
    </NoticeLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <NoticeLayout
          type='search'
          icon='/images/search-icon.svg'
          title='검색결과'
        >
          <SearchResultContainer>
            <NoResultsMessage>검색 중...</NoResultsMessage>
          </SearchResultContainer>
        </NoticeLayout>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
