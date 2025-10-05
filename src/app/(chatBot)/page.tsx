'use client';

import { MainLayout } from '@/components/layout/main-layout';
import ChatbotComponent from '@/components/ChatbotComponent';

export default function Home() {
  return (
    <MainLayout activeSection='chatbot'>
      <ChatbotComponent />
    </MainLayout>
  );
}
