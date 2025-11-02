'use client';

import { HealthProvider } from '@/services/chat/health/HealthContext';
import ChatbotComponent from '@/components/ChatbotComponent';

// HealthProvider의 isHealthy의 value를 보고 에외처리 필요. (ex. false인 경우, 챗 입력을 막아놓고 "잠시 후에 시도해주세요" 문구 띄우기 )

export default function Home() {
  return (
    <HealthProvider>
      <ChatbotComponent />
    </HealthProvider>
  );
}
