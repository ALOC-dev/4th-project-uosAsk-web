'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { generalNotices } from '@/data/notices';

export default function GeneralPage() {
  return (
    <NoticeLayout type='general'>
      <AnimatedNoticeList notices={generalNotices} />
    </NoticeLayout>
  );
}
