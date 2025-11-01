export interface Notice {
  title: string;
  postedDate: string;
  department: string;
  link: string;
  category: string;
  viewCount: number;
}

// API 응답 구조
export interface NoticeApiResponse {
  hot: Notice[];
  content: Notice[];
}

export type NoticeType = 'general' | 'academic' | 'department' | 'search';
