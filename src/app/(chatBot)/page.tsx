'use client';

import { MainLayout } from '@/components/layout/main-layout';
import ChatbotComponent from '@/components/ChatbotComponent';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <MainLayout
      activeSection='chatbot'
      onNewChat={() => {
        if (pathname === '/') {
          window.location.reload();
        } else {
          router.push('/');
        }
      }}
    >
      <ChatbotComponent />
    </MainLayout>
  );
}
