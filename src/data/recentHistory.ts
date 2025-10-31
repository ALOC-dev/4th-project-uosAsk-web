export interface RecentHistoryItem {
  id: string;
  title: string;
  category: 'general' | 'academic' | 'department';
  date: string;
  url?: string;
}

export const recentHistoryData: RecentHistoryItem[] = [
  {
    id: '1',
    title: '제 17회 공과대학 창의적 공학설계 경진대회 개최 안내',
    category: 'department',
    date: '2024-10-25',
    url: '/department',
  },
  {
    id: '2',
    title: '[박물관] 9/26(금) 100주년기념관 개관식 및 특별전시회 안내',
    category: 'general',
    date: '2024-10-24',
    url: '/general',
  },
  {
    id: '3',
    title: '[교수학습개발센터] 2025학년도 1학기 수강신청 안내 및 학점 이수 관련 공지사항',
    category: 'academic',
    date: '2024-10-23',
    url: '/academic',
  },
];

