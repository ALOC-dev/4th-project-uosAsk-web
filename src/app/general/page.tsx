'use client';

import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { useEffect, useState } from 'react';
import { getNoticeList } from '@/services/notice/getNoticeList';
import { CATEGORIES, Category } from '@/constants';

const params = {
  department: [],
  keyword: '',
  category: CATEGORIES[0],
  page: 0,
  exact: false,
}

export default function GeneralPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    const fetchNotices = async () => {
      try {
        const response = await getNoticeList(params)
        setNotices(response.data ?? response);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [] )

  return (
    <NoticeLayout type='general'>
      <AnimatedNoticeList notices={notices} />
    </NoticeLayout>
  );
}
