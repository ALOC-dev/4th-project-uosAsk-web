'use client';

import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/utils/create-emotion-cache';
import { useMemo } from 'react';

interface EmotionProviderProps {
  children: React.ReactNode;
  cache?: EmotionCache;
}

export default function EmotionProvider({
  children,
  cache,
}: EmotionProviderProps) {
  const clientCache = useMemo(() => {
    if (cache) return cache;
    const newCache = createEmotionCache();
    newCache.compat = true;
    return newCache;
  }, [cache]);

  return <CacheProvider value={clientCache}>{children}</CacheProvider>;
}
