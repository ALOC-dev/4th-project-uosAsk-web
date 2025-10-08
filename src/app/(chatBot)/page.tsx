'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <MainLayout
      activeSection='chatbot'
      onNewChat={() => useRouter().replace('/')}
    >
      <div>채팅봇 페이지 컨텐츠가 여기에 들어갑니다.</div>
    </MainLayout>
  );
}
