import { Theme } from '@emotion/react';

export const lightTheme: Theme = {
  colors: {
    // Primary Colors (from Figma design)
    primary: '#408CFF',
    secondary: '#98BFFA',

    // Background Colors
    background: '#FFFFFF',
    backgroundSecondary: '#F0F1F5',
    backgroundTertiary: '#E5E6EC',
    backgroundButton: '#FFFFFF',
    contentContainer: '#D9D9D9',

    // Text Colors
    foreground: '#000000',
    text: '#000000',
    textSecondary: '#5C5E66',
    textTertiary: '#A9ADB9',
    navTextActive: '#5C5E66',

    // Border Colors
    border: 'rgba(0, 0, 0, 0.1)',
    borderLight: 'rgba(0, 0, 0, 0.3)',

    // Status Colors
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#06b6d4',

    // Utility
    muted: '#6b7280',
    mutedBackground: '#f3f4f6',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
  fonts: {
    sans: "'Noto Sans KR', ui-sans-serif, system-ui, sans-serif",
    mono: 'var(--font-geist-mono), monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  radii: {
    sm: '0.625rem',
    md: '1.25rem',
    lg: '1.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0.1px 0.1px 2px 0px rgba(0, 0, 0, 0.25)',
    md: '1px 1px 5px 0px rgba(0, 0, 0, 0.25)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
};

export const nightTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    // Primary Colors (same as light theme)
    primary: '#408CFF',
    secondary: '#98BFFA',

    // Background Colors (from Figma night theme)
    background: '#1D2127',
    backgroundSecondary: '#2C3038',
    backgroundTertiary: '#414651',
    backgroundButton: '#414651',
    contentContainer: '#2C3038',

    // Text Colors
    foreground: '#FFFFFF',
    text: '#FFFFFF',
    textSecondary: '#A9ADB9',
    textTertiary: '#A9ADB9',
    textQuaternary: '#B4B7C4',
    textFaded: 'rgba(180, 183, 196, 0.5)',
    navTextActive: '#FFFFFF',

    // Border Colors
    border: 'rgba(0, 0, 0, 0.1)',
    borderLight: 'rgba(0, 0, 0, 0.3)',

    // Status Colors (same as light theme)
    error: '#ef4444',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#06b6d4',

    // Utility
    muted: '#6b7280',
    mutedBackground: '#2C3038',
  },
};

// 별칭 (day 모드)
export const dayTheme: Theme = lightTheme;

// Deprecated: use dayTheme or lightTheme instead
export const darkTheme: Theme = nightTheme;

// 기본 테마
export const theme = lightTheme;
