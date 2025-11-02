export interface Notice {
  id: number;
  title: string;
  postedDate: string;
  department: string;
  link: string;
  category: string;
  viewCount: number;
}

// 백엔드 API 응답 구조
export interface NoticeApiResponse {
  hot: Notice[];
  content: Notice[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type NoticeType = 'general' | 'academic' | 'department' | 'search';
