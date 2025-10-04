'use client';

import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // 일단 Emotion 없이 children만 반환
  // 나중에 필요한 Provider들을 여기에 추가
  return <>{children}</>;
}
