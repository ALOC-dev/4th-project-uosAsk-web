'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { dayTheme, nightTheme } from '@/styles/theme';
import type { Theme } from '@emotion/react';

export type ThemeMode = 'day' | 'night';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  mounted: boolean;
}

// 기본값 제공으로 에러 방지
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'day',
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'uosask-theme';

export function ThemeProvider({ children }: ThemeProviderProps) {
  // 서버와 클라이언트 모두 'day'로 시작하여 hydration 불일치 방지
  const [themeMode, setThemeMode] = useState<ThemeMode>('day');
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서만 localStorage에서 테마 로드
  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
        if (savedTheme === 'day' || savedTheme === 'night') {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
      }
    }
  }, []);

  // 테마 변경 시 localStorage에 저장 및 data-theme 속성 업데이트
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, themeMode);
        document.documentElement.setAttribute('data-theme', themeMode);
      } catch (error) {
        console.warn('Failed to save theme:', error);
      }
    }
  }, [themeMode, mounted]);

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === 'day' ? 'night' : 'day'));
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);
  }, []);

  const currentTheme: Theme = themeMode === 'night' ? nightTheme : dayTheme;

  return (
    <ThemeContext.Provider
      value={{ themeMode, toggleTheme, setTheme, mounted }}
    >
      <EmotionThemeProvider theme={currentTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
