'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import {
  generalNoticeData,
  academicNoticeData,
  departmentNoticeData,
} from '@/data/notices';
import { NoticeApiResponse } from '@/types/notice';

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
    null
  );

  useEffect(() => {
    if (!query) {
      setSearchResults(null);
      return;
    }

    // 모든 공지사항을 합침 (hot과 content 모두)
    const allNotices = [
      ...generalNoticeData.hot,
      ...generalNoticeData.content,
      ...academicNoticeData.hot,
      ...academicNoticeData.content,
      ...departmentNoticeData.hot,
      ...departmentNoticeData.content,
    ];

    // 검색어로 공지사항 필터링 (제목 기준)
    const results = allNotices.filter((notice) =>
      notice.title.toLowerCase().includes(query.toLowerCase())
    );

    // NoticeApiResponse 형식으로 변환 (검색 결과는 hot 없이 content만)
    setSearchResults({
      hot: [],
      content: results,
      page: 0,
      size: results.length,
      totalElements: results.length,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    });
  }, [query]);

  return (
    <NoticeLayout
      type='search'
      icon='/images/search-icon.svg'
      title={query || '검색결과'}
    >
      <SearchResultContainer>
        {query && searchResults && (
          <SearchInfo>
            <SearchKeyword>{query}</SearchKeyword>
            <SearchCount>
              {searchResults.content.length > 0
                ? `${searchResults.content.length}개의 공지사항을 찾았습니다`
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
        <NoticeLayout type='search' icon='/images/search-icon.svg' title='검색결과'>
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

