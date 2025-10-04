# UoScholar - 서울시립대 학습 커뮤니티

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)
![Emotion](https://img.shields.io/badge/Emotion-11.14.0-D26AC2?logo=styled-components)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.13-06B6D4?logo=tailwindcss)
![pnpm](https://img.shields.io/badge/pnpm-10.15.1-orange?logo=pnpm)

## 📚 프로젝트 소개

서울시립대학교 학생들을 위한 학습 커뮤니티 플랫폼입니다.

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Emotion + Tailwind CSS
- **패키지 매니저**: pnpm

## 🚀 빠른 시작

### 환경설정

- Node.js 18+
- pnpm (권장)

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start

# 린트 체크
pnpm lint
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

## 📂 프로젝트 구조

```
src/
├── app/                    # App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── ui/               # 순수 UI 컴포넌트 (도메인 무관)
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── providers/        # Provider 컴포넌트
│   └── (domain)/         # 도메인별 컴포넌트
├── hooks/                # 커스텀 훅
├── services/             # API 레이어
├── store/                # 상태 관리
├── types/                # TypeScript 타입 정의
├── styles/               # 스타일 관련 (테마 등)
└── utils/                # 유틸리티 함수
```

## 🎨 스타일링

이 프로젝트는 **Emotion**과 **Tailwind CSS**를 함께 사용합니다.

- **Emotion**: 컴포넌트 레벨의 동적 스타일링
- **Tailwind CSS**: 유틸리티 클래스 기반 빠른 스타일링

자세한 내용은 [Emotion 설정 가이드](./docs/EMOTION_SETUP.md)를 참고하세요.

## 📖 문서

- [Emotion 설정 가이드](./docs/EMOTION_SETUP.md)
- [Babel 없이 Emotion 사용하기](./docs/WHY_NO_BABEL.md)
- [Cursor Rules](./.cursorrules) - 프로젝트 코딩 컨벤션

## 🤝 기여

이 프로젝트는 ALOC 4기 팀 프로젝트입니다.
