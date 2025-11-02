'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { NoticeApiResponse } from '@/types/notice';
import { searchNotices } from '@/services/notice/searchNotices';

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
  const [searchResults, setSearchResults] = useState<NoticeApiResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 백엔드 API 호출 (keyword 파라미터로 검색어 전달)
        const data = await searchNotices({
          keyword: query,
          page: 0,
          size: 15,
          exact: false, // 부분 검색
        });

        setSearchResults(data);
      } catch (err) {
        console.error('검색 실패:', err);
        setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
        setSearchResults(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <NoticeLayout
      type='search'
      icon='/images/search-icon.svg'
      title={query || '검색결과'}
    >
      <SearchResultContainer>
        {query && searchResults && !isLoading && (
          <SearchInfo>
            <SearchKeyword>{query}</SearchKeyword>
            <SearchCount>
              {searchResults.totalElements > 0
                ? `${searchResults.totalElements}개의 공지사항을 찾았습니다`
                : '검색 결과가 없습니다'}
            </SearchCount>
          </SearchInfo>
        )}

        {!query ? (
          <NoResultsMessage>
            검색어를 입력해주세요
            <br />
            사이드바의 공지검색을 클릭하여 검색할 수 있습니다
          </NoResultsMessage>
        ) : isLoading ? (
          <NoResultsMessage>검색 중...</NoResultsMessage>
        ) : error ? (
          <NoResultsMessage>{error}</NoResultsMessage>
        ) : searchResults && searchResults.content.length > 0 ? (
          <AnimatedNoticeList noticeData={searchResults} />
        ) : (
          <NoResultsMessage>
            "{query}"에 대한 검색 결과가 없습니다
            <br />
            다른 검색어로 시도해보세요
          </NoResultsMessage>
        )}
      </SearchResultContainer>
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
