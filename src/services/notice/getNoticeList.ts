import { apiClient } from '../api/client';
import { Category, Department } from '@/constants';

/*
category 값을 넘길 때, Category 타입에서 index number로 접근해서 가져오기.
department 값을 넘길 때, Department 타입에서 index number로 접근해서 Department[] 가져오기.
*/
interface GetNoticeListParams {
  department: Department[];
  keyword: string;
  category: Category;
  page: number;
  exact: boolean;
}

export const getNoticeList = async (params: GetNoticeListParams) => {
  const queryParams = {
    ...params,
    size: 15, // size 고정
    department: params.department.join(','), // department에 overwrite하기
  };
  
  const response = await apiClient.get('/notices/search', {
    params: queryParams,
  });

  return response;
};
