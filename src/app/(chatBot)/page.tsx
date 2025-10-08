'use client';

import { MainLayout } from '@/components/layout/main-layout';
import ChatbotComponent from '@/components/ChatbotComponent';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <MainLayout
      activeSection='chatbot'
      onNewChat={() => useRouter().replace('/')}
    >
      <ChatbotComponent />
    </MainLayout>
  );
}
