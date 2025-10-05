'use client';

import { ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { lightTheme } from '@/styles/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <EmotionThemeProvider theme={lightTheme}>{children}</EmotionThemeProvider>
  );
}
