# Babel 없이 Emotion 사용하기

## 🤔 왜 `.babelrc`가 필요 없나요?

### 과거 (Pages Router 시절)

- Emotion의 최적화된 기능을 위해 `@emotion/babel-plugin` 필요
- 개발자 경험 향상 (자동 라벨링, 소스맵 등)
- SSR 설정을 위해 복잡한 Babel 구성 필요

### 현재 (App Router + React 19)

- **React 19의 새로운 JSX Transform** 사용
- **tsconfig.json의 `jsxImportSource`** 설정으로 충분
- **Next.js 15 + Turbopack** 최적화 내장
- SSR은 `useServerInsertedHTML` 훅으로 간단히 처리

## ✅ Babel 없이도 작동하는 이유

### 1. TypeScript 컴파일러가 처리

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

TypeScript가 컴파일 시점에 JSX를 Emotion으로 변환합니다.

### 2. 자동 JSX Runtime

```tsx
'use client';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

// 자동으로 Emotion JSX로 변환됨
const Component = () => (
  <div
    css={css`
      color: red;
    `}
  >
    Hello
  </div>
);
```

### 3. Next.js 15의 내장 최적화

- Turbopack이 Emotion을 자동으로 최적화
- 빌드 시 불필요한 스타일 제거
- 자동 코드 스플리팅

## 🚀 Babel 없이 사용의 장점

### 1. **빠른 빌드 속도**

- Babel 변환 과정 생략
- Turbopack의 네이티브 성능 활용
- 개발 서버 시작 시간 단축

### 2. **단순한 설정**

- `.babelrc` 파일 불필요
- 플러그인 관리 불필요
- 설정 충돌 문제 없음

### 3. **미래 지향적**

- Next.js 팀의 권장 방식
- Turbopack 완벽 호환
- React 최신 기능 활용

## 📋 필요한 최소 설정

### 1. 패키지 설치

```bash
pnpm add @emotion/react @emotion/styled @emotion/cache @emotion/server
```

### 2. tsconfig.json

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

### 3. Provider 설정

```tsx
// src/components/providers/emotion-provider.tsx
'use client';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
// ...
```

끝! 이게 전부입니다. 🎉

## ⚠️ 주의사항

### CSS Prop 사용 시

```tsx
'use client'; // 필수!
/** @jsxImportSource @emotion/react */ // 필수!
import { css } from '@emotion/react';

const Component = () => (
  <div
    css={css`
      color: red;
    `}
  >
    Hello
  </div>
);
```

두 가지 모두 필요합니다:

1. `'use client'` - 클라이언트 컴포넌트 지정
2. `/** @jsxImportSource @emotion/react */` - JSX 변환 지정

### Styled Components는 더 간단

```tsx
'use client'; // 이것만 필요!
import styled from '@emotion/styled';

const Button = styled.button`
  color: red;
`;
```

## 🔗 참고 자료

- [Emotion 공식 문서](https://emotion.sh/docs/introduction)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React JSX Transform](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
- [Turbopack](https://nextjs.org/docs/architecture/turbopack)
