export interface Notice {
  id: string;
  title: string;
  department: string;
  date: string;
  clickCount: number;
  isImportant?: boolean;
}

export type NoticeType = 'general' | 'academic' | 'department' | 'search';
