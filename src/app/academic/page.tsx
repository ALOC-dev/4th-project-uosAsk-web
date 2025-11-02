'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { academicNoticeData } from '@/data/notices';

export default function AcademicPage() {
  return (
    <NoticeLayout type='academic'>
      <AnimatedNoticeList noticeData={academicNoticeData} />
    </NoticeLayout>
  );
}
