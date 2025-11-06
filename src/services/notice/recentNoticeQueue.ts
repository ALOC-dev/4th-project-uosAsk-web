export interface RecentNotice {
  title: string;
  link: string;
}

const KEY = 'recent_notices';
const LIMIT = 10;
export const RECENT_NOTICE_EVENT = 'recent_notices:update';

export const getRecentNotices = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(KEY) || '[]');
};

export const addRecentNotice = (notice: RecentNotice) => {
  if (typeof window === 'undefined') return;

  let list: RecentNotice[] = getRecentNotices();
  list = list.filter((n) => n.link !== notice.link);
  list.unshift(notice);
  list = list.slice(0, LIMIT);

  localStorage.setItem(KEY, JSON.stringify(list));

  // 같은 탭에서도 즉시 반영되도록 커스텀 이벤트 발행
  try {
    window.dispatchEvent(
      new CustomEvent(RECENT_NOTICE_EVENT, { detail: list }),
    );
  } catch {}
};
