import { apiClient } from '../api/client';
import { Category, Department } from '@/constants';

/*
category 값을 넘길 때, Category 타입에서 index number로 접근해서 가져오기.
department 값을 넘길 때, Department 타입에서 index number로 접근해서 Department[] 가져오기.
*/
interface GetNoticeListParams {
  department?: Department[]; // 선택적으로 변경
  keyword: string;
  category?: Category; // 선택적으로 변경
  page: number;
  exact: boolean;
}

export const getNoticeList = async (params: GetNoticeListParams) => {
  const queryParams: Record<string, any> = {
    keyword: params.keyword,
    page: params.page,
    exact: params.exact,
    size: 15, // size 고정
  };

  // department가 있으면 추가 (학과 공지)
  if (params.department && params.department.length > 0) {
    queryParams.department = params.department.join(',');
  }

  // category가 있으면 추가 (일반/학사 공지)
  if (params.category) {
    queryParams.category = params.category;
  }

  const response = await apiClient.get('/notices/search', {
    params: queryParams,
  });

  return response;
};
