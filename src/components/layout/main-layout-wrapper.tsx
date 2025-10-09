'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MainLayout } from './main-layout';

interface MainLayoutWrapperProps {
  children: ReactNode;
}

export function MainLayoutWrapper({ children }: MainLayoutWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 경로에 따라 activeSection 결정
  const getActiveSection = (path: string): string => {
    if (path === '/') return 'chatbot';
    if (path.startsWith('/academic')) return 'academic';
    if (path.startsWith('/department')) return 'department';
    if (path.startsWith('/general')) return 'general';
    if (path.startsWith('/search')) return 'search';
    return 'chatbot';
  };

  const handleNewChat = () => {
    if (pathname === '/') {
      window.location.reload();
    } else {
      router.push('/');
    }
  };

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'chatbot':
        router.push('/');
        break;
      case 'academic':
        router.push('/academic');
        break;
      case 'department':
        router.push('/department');
        break;
      case 'general':
        router.push('/general');
        break;
      case 'search':
        router.push('/search');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <MainLayout
      activeSection={getActiveSection(pathname)}
      onNavigate={handleNavigate}
      onNewChat={handleNewChat}
    >
      {children}
    </MainLayout>
  );
}
