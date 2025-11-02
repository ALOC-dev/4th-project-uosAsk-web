'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { CATEGORIES } from '@/constants';
import { getNoticeList } from '@/services/notice/getNoticeList';
import { NoticeApiResponse } from '@/types/notice';
import { useEffect, useState } from 'react';

const params = {
  department: [],
  keyword: '',
  category: CATEGORIES[1],
  page: 0,
  exact: false,
};

export default function AcademicPage() {
  const [notices, setNotices] = useState<NoticeApiResponse | undefined>();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getNoticeList(params);
        setNotices(response.data ?? response);
      } catch (e) {
        console.error(e);
      }
    };

    fetchNotices();
  }, []);

  return (
    <NoticeLayout type='academic'>
      <AnimatedNoticeList noticeData={notices} />
    </NoticeLayout>
  );
}
