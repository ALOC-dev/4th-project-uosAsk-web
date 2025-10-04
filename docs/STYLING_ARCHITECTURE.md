# 스타일링 아키텍처 가이드

## 📊 프로젝트 스타일링 구조

이 프로젝트는 **Emotion (CSS-in-JS)** 기반으로 구축되었으며, 다음과 같은 계층 구조를 가집니다:

```
스타일링 계층
├── 1. globals.css        # Minimal CSS Reset (HTML 요소만)
├── 2. theme.ts           # Design Tokens (색상, 스페이싱, 폰트 등)
├── 3. GlobalStyles.tsx   # Emotion Global Styles (theme 기반)
└── 4. Component Styles   # 각 컴포넌트의 스타일 (theme 사용)
```

## 🎯 각 파일의 역할

### 1. `src/app/globals.css` (최소한의 CSS Reset)

**역할**: 브라우저 기본 스타일 제거 및 초기화만

```css
/* ✅ 포함해야 할 것 */
- box-sizing reset
- margin/padding reset
- 기본 리스트 스타일 제거
- 이미지 기본 스타일

/* ❌ 포함하지 말아야 할 것 */
- 색상 정의
- 폰트 설정
- 레이아웃 스타일
- 컴포넌트 스타일
```

### 2. `src/styles/theme.ts` (Design System)

**역할**: 모든 디자인 토큰의 중앙 관리

```typescript
export const theme = {
  colors: {
    primary: '#3b82f6',
    background: '#ffffff',
    // ... 모든 색상
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    // ... 모든 간격
  },
  fonts: {
    sans: 'var(--font-geist-sans), ...',
    // ... 폰트 정의
  },
  fontSizes: {
    /* ... */
  },
  radii: {
    /* ... */
  },
  shadows: {
    /* ... */
  },
  breakpoints: {
    /* ... */
  },
};
```

**장점**:

- ✅ 일관된 디자인 시스템
- ✅ TypeScript 자동완성
- ✅ 다크모드 쉽게 전환
- ✅ 중앙에서 값 변경 가능

### 3. `src/components/global-styles.tsx` (Emotion Global)

**역할**: Theme을 사용한 전역 스타일

```tsx
'use client';
import { Global, css, useTheme } from '@emotion/react';

export default function GlobalStyles() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        body {
          background: ${theme.colors.background};
          color: ${theme.colors.foreground};
          font-family: ${theme.fonts.sans};
        }
      `}
    />
  );
}
```

### 4. Component Styles (컴포넌트 스타일)

**방법 1: Styled Components**

```tsx
'use client';
import styled from '@emotion/styled';

const Button = styled.button`
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: ${(props) => props.theme.radii.md};
`;
```

**방법 2: CSS Prop**

```tsx
'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';

function Component() {
  const theme = useTheme();
  return (
    <div
      css={css`
        padding: ${theme.spacing.md};
        color: ${theme.colors.primary};
      `}
    >
      Content
    </div>
  );
}
```

## 🔄 다른 프로젝트와의 비교

### ❌ 안티패턴 (피해야 할 것)

```typescript
// globals.css에 색상 정의 (X)
:root {
  --primary: #3b82f6;  // ❌ theme.ts로 이동
}

// theme.ts를 정의만 하고 사용 안함 (X)
export const theme = { /* ... */ };  // ❌ ThemeProvider 없음

// 중복된 정의 (X)
globals.css: --background: white
theme.ts: background: 'white'  // ❌ 하나만 사용
```

### ✅ 베스트 프랙티스

1. **globals.css**: CSS Reset만
2. **theme.ts**: 모든 디자인 토큰
3. **GlobalStyles**: Theme 기반 전역 스타일
4. **Components**: Theme 사용

## 📦 일반적인 Next.js + Emotion 구조

### 패턴 A: Emotion 전용 (우리 프로젝트 ✅)

```
✅ globals.css     (Minimal reset)
✅ theme.ts        (Design tokens)
✅ GlobalStyles    (Theme-based global)
✅ Components      (Use theme)
```

**장점**:

- 완전한 타입 안정성
- 일관된 스타일링
- 다크모드 쉬움

### 패턴 B: 하이브리드

```
✅ globals.css     (Reset + 일부 utility)
✅ theme.ts        (Main design tokens)
⚠️  CSS Modules    (Page-specific styles)
✅ Components      (Emotion + theme)
```

**사용 케이스**: 기존 CSS 코드가 많을 때

### 패턴 C: Pure Emotion (고급)

```
❌ globals.css     (없음)
✅ theme.ts        (All tokens)
✅ GlobalStyles    (모든 전역 스타일)
✅ Components      (Emotion only)
```

**사용 케이스**: 완전한 JS 기반 스타일링

## 🎨 Theme 사용 예제

### 기본 사용

```tsx
'use client';
import styled from '@emotion/styled';

const Card = styled.div`
  padding: ${(p) => p.theme.spacing.lg};
  background: ${(p) => p.theme.colors.background};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: ${(p) => p.theme.radii.md};
  box-shadow: ${(p) => p.theme.shadows.md};
`;
```

### useTheme Hook

```tsx
'use client';
import { useTheme } from '@emotion/react';

function Component() {
  const theme = useTheme();

  return (
    <div
      style={{
        color: theme.colors.primary,
        padding: theme.spacing.md,
      }}
    >
      Content
    </div>
  );
}
```

### 반응형 디자인

```tsx
const Container = styled.div`
  padding: ${(p) => p.theme.spacing.md};

  @media (min-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding: ${(p) => p.theme.spacing.lg};
  }

  @media (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    padding: ${(p) => p.theme.spacing.xl};
  }
`;
```

## 🌓 다크모드 구현

```typescript
// theme.ts
export const lightTheme = { /* ... */ };
export const darkTheme = {
  ...lightTheme,
  colors: {
    background: '#0a0a0a',
    foreground: '#ededed',
    // ...
  }
};

// theme-provider.tsx
'use client';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from '@/styles/theme';

export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
```

## 📝 체크리스트

프로젝트 스타일링을 설정할 때:

- [ ] `globals.css`는 CSS Reset만 포함
- [ ] `theme.ts`에 모든 디자인 토큰 정의
- [ ] TypeScript 타입 정의 (`emotion.d.ts`)
- [ ] `ThemeProvider`로 theme 주입
- [ ] `GlobalStyles`로 전역 스타일 적용
- [ ] 컴포넌트에서 theme 사용
- [ ] 중복된 정의 제거 (CSS Variables vs Theme)

## 🔗 참고 자료

- [Emotion 공식 문서 - Theming](https://emotion.sh/docs/theming)
- [Next.js + Emotion 예제](https://github.com/vercel/next.js/tree/canary/examples/with-emotion)
- [Design Tokens 가이드](https://css-tricks.com/what-are-design-tokens/)
