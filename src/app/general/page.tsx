'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/animated-notice-list';
import { generalNotices } from '@/data/notices';
import { Notice } from '@/types/notice';

export default function GeneralPage() {
  const handleNoticeClick = (notice: Notice) => {
    console.log('공지사항 클릭:', notice);
    // 여기에 공지사항 상세 페이지로 이동하는 로직 추가 가능
  };

  return (
    <NoticeLayout type='general'>
      <AnimatedNoticeList
        notices={generalNotices}
        onNoticeClick={handleNoticeClick}
      />
    </NoticeLayout>
  );
}
