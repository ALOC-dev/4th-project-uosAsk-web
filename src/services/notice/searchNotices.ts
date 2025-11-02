import { apiClient } from '../api/client';
import { NoticeApiResponse } from '@/types/notice';

interface SearchNoticesParams {
  keyword: string;
  page?: number;
  size?: number;
  category?: string; // 'GENERAL', 'ACADEMIC', 'COLLEGE_*' 등
  department?: string; // 단일 또는 쉼표로 구분된 복수 학과
  exact?: boolean;
}

/**
 * 공지사항 검색 API
 * @param params - 검색 파라미터
 * @returns NoticeApiResponse - 검색 결과 (hot 배열은 비어있음)
 */
export const searchNotices = async (
  params: SearchNoticesParams
): Promise<NoticeApiResponse> => {
  const queryParams = {
    keyword: params.keyword,
    page: params.page ?? 0,
    size: params.size ?? 15,
    exact: params.exact ?? false,
    ...(params.category && { category: params.category }),
    ...(params.department && { department: params.department }),
  };

  const response = await apiClient.get<NoticeApiResponse>('/notices/search', {
    params: queryParams,
  });

  return response.data;
};

