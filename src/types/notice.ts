export interface Notice {
  id: string;
  title: string;
  department: string;
  date: string;
  isImportant?: boolean;
}

export type NoticeType = 'general' | 'academic' | 'department';
