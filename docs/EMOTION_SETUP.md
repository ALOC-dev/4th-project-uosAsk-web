# Emotion 설정 가이드 (App Router)

이 프로젝트는 **Emotion**을 사용하여 CSS-in-JS 스타일링을 구현합니다.
Next.js 15 **App Router** 방식에 최적화되어 있습니다.

## 📦 설치된 패키지

```json
{
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@emotion/cache": "^11.14.0",
    "@emotion/server": "^11.11.0"
  }
}
```

> **참고**: Babel 설정 없이 Emotion을 사용합니다. Next.js 15 + Turbopack과 완벽하게 호환됩니다.

## 🔧 설정 파일

### 1. `tsconfig.json`

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
    // ... 기타 설정
  }
}
```

### 2. `src/utils/create-emotion-cache.ts`

Emotion 캐시 생성 유틸리티

### 3. `src/components/providers/emotion-provider.tsx`

App Router에서 Emotion을 사용하기 위한 클라이언트 컴포넌트 Provider

### 4. `src/app/layout.tsx`

Root Layout에서 EmotionProvider 적용

## 🎨 사용 방법

### 1. CSS Prop 방식 (클라이언트 컴포넌트)

```tsx
'use client'; // App Router에서는 필수!

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Component = () => {
  return (
    <div
      css={css\`
        padding: 20px;
        background-color: #f0f0f0;

        &:hover {
          background-color: #e0e0e0;
        }
      \`}
    >
      Content
    </div>
  );
};
```

### 2. Styled Components 방식 (클라이언트 컴포넌트)

```tsx
'use client'; // App Router에서는 필수!

import styled from '@emotion/styled';

const Button = styled.button\`
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;

  &:hover {
    background-color: #2563eb;
  }
\`;

const Component = () => {
  return <Button>클릭하세요</Button>;
};
```

### 3. Theme 사용 (클라이언트 컴포넌트)

```tsx
'use client'; // App Router에서는 필수!

/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';

const Component = () => {
  const theme = useTheme();

  return (
    <div
      css={css\`
        color: \${theme.colors.primary};
        padding: \${theme.spacing.md};
      \`}
    >
      Themed Content
    </div>
  );
};
```

## 📁 관련 파일

- `src/types/emotion.d.ts` - Emotion Theme 타입 정의
- `src/styles/theme.ts` - 테마 객체 정의
- `src/components/example-emotion-component.tsx` - 예제 컴포넌트
- `src/components/providers/emotion-provider.tsx` - Emotion Provider (App Router용)
- `src/utils/create-emotion-cache.ts` - Emotion 캐시 생성 유틸리티

## ⚠️ 주의사항 (App Router)

1. **'use client' 필수**: Emotion을 사용하는 모든 컴포넌트는 클라이언트 컴포넌트여야 함
2. **css prop 사용 시**: `'use client'` + `/** @jsxImportSource @emotion/react */` 주석 모두 필요
3. **타입 안정성**: `src/types/emotion.d.ts`에서 Theme 인터페이스 확장 가능
4. **SSR 지원**: `useServerInsertedHTML` 훅으로 서버 사이드 렌더링 완벽 지원
5. **성능**: Emotion 캐시를 통해 스타일 중복 제거 및 최적화
6. **Server Component**: Emotion은 클라이언트 컴포넌트에서만 사용 가능 (Server Component 불가)

## 🚀 실행

```bash
pnpm dev
```

메인 페이지에서 Emotion 예제 컴포넌트를 확인할 수 있습니다.
