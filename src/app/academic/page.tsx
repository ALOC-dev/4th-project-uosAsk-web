'use client';

import { NoticeLayout } from '@/components/layout/notice-layout';
import { academicNotices } from '@/data/notices';
import { Notice } from '@/types/notice';

export default function AcademicPage() {
  const handleNoticeClick = (notice: Notice) => {
    console.log('학사공지 클릭:', notice);
    // 여기에 공지사항 상세 페이지로 이동하는 로직 추가 가능
  };

  return (
    <NoticeLayout
      notices={academicNotices}
      type='academic'
      onNoticeClick={handleNoticeClick}
    />
  );
}
