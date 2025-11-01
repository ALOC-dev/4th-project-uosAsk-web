export interface Notice {
  id: string;
  title: string;
  department: string;
  date: string;
  clickCount: number;
  link?: string;
  isImportant?: boolean;
}

// API 응답 구조
export interface NoticeApiResponse {
  hot: Notice[];
  content: Notice[];
}

export type NoticeType = 'general' | 'academic' | 'department' | 'search';
