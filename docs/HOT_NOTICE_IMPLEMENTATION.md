# HOT 공지사항 구현 가이드

## 📌 개요

백엔드 API 응답 구조에 맞춰 HOT 공지사항 기능이 구현되었습니다.

---

## 🎯 HOT 공지사항 조건

백엔드에서 다음 조건을 모두 만족할 때 `hot` 배열에 **조회수 상위 3건**을 포함합니다:

1. **`exact=true`** - 정확한 검색
2. **`page=0`** - 첫 페이지
3. **`keyword` 비어있음** - 검색어 없음

---

## 🔧 구현 구조

### 1. 타입 정의 (`src/types/notice.ts`)

```typescript
export interface Notice {
  id: number;
  title: string;
  postedDate: string; // "YYYY-MM-DD" 형식
  department: string;
  link: string;
  category: string;
  viewCount: number;
}

export interface NoticeApiResponse {
  hot: Notice[]; // HOT 공지사항 (조회수 상위 3건)
  content: Notice[]; // 일반 공지사항
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### 2. 컴포넌트 구조

#### `AnimatedNoticeList` (공지사항 목록)

```tsx
interface AnimatedNoticeListProps {
  noticeData: NoticeApiResponse;
}

export function AnimatedNoticeList({ noticeData }: AnimatedNoticeListProps) {
  const hotNotices = noticeData?.hot || [];
  const contentNotices = noticeData?.content || [];

  return (
    <NoticeListContainer>
      {/* HOT 공지사항 (카드 스타일) */}
      {hotNotices.map((notice, index) => (
        <HotNoticeItem key={`hot-${notice.id}`} notice={notice} />
      ))}

      {/* 일반 공지사항 (리스트 스타일) */}
      {contentNotices.map((notice, index) => (
        <NoticeItem key={notice.id} onClick={() => handleClick(notice)}>
          {/* ... */}
        </NoticeItem>
      ))}
    </NoticeListContainer>
  );
}
```

#### `HotNoticeItem` (HOT 공지사항 카드)

- **HOT!** 뱃지 표시
- 카드 스타일 (배경색, 그림자, 둥근 모서리)
- 호버 시 위로 떠오르는 애니메이션

---

## 📡 API 요청 예시

### 일반공지 (HOT 활성화)

```bash
GET /notices/search?category=GENERAL&page=0&size=15&exact=true
```

**응답:**

```json
{
  "hot": [
    {
      "id": 449,
      "title": "국제관계학과 졸업요건 안내",
      "postedDate": "2025-03-26",
      "department": "국제관계학과",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=econo01&seq=2543",
      "category": "COLLEGE_SOCIAL_SCIENCES",
      "viewCount": 6452
    }
    // ... 상위 3건
  ],
  "content": [
    // ... 일반 공지사항
  ],
  "page": 0,
  "size": 15,
  "totalElements": 123,
  "totalPages": 9,
  "hasNext": true,
  "hasPrevious": false
}
```

### 학과공지 (단일 학과)

```bash
GET /notices/search?department=컴퓨터과학부&page=0&size=10&exact=true
```

### 학과공지 (복수 학과)

```bash
GET /notices/search?department=행정학과,국제관계학과&page=0&size=10&exact=true
```

### 키워드 검색 (HOT 비활성화)

```bash
GET /notices/search?department=행정학과,국제관계학과&keyword=장학&page=0&size=10
```

**응답:**

```json
{
  "hot": [], // 키워드 검색 시 빈 배열
  "content": [
    // ... 검색 결과
  ],
  "page": 0,
  "size": 10,
  "totalElements": 15,
  "totalPages": 2,
  "hasNext": true,
  "hasPrevious": false
}
```

---

## 🎨 UI 차이점

### HOT 공지사항 (`hot` 배열)

```css
✅ HOT! 뱃지 (그라디언트 텍스트)
✅ 카드 스타일
   - 배경색: theme.colors.backgroundButton
   - 그림자: 0 2px 4px rgba(0, 0, 0, 0.2)
   - 둥근 모서리: theme.radii.md
   - 좌우 마진 있음
✅ 호버 효과
   - 위로 2px 이동
   - 그림자 증가: 0 4px 8px rgba(0, 0, 0, 0.15)
✅ 목록 최상단에 표시
```

### 일반 공지사항 (`content` 배열)

```css
✅ 리스트 스타일
   - 투명 배경
   - 하단 경계선만 표시
   - 마진 없음
✅ 호버 효과
   - 배경색만 변경
✅ HOT 공지사항 다음에 표시
```

---

## 📝 페이지 구현 예시

```tsx
'use client';

import { useEffect, useState } from 'react';
import { NoticeLayout } from '@/components/notice/notice-layout';
import { AnimatedNoticeList } from '@/components/notice/notice-list';
import { NoticeApiResponse } from '@/types/notice';

export default function GeneralPage() {
  const [noticeData, setNoticeData] = useState<NoticeApiResponse | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          '/api/notices/search?category=GENERAL&page=0&size=15&exact=true'
        );
        const data = await response.json();
        setNoticeData(data);
      } catch (error) {
        console.error('공지사항 조회 실패:', error);
      }
    };

    fetchNotices();
  }, []);

  if (!noticeData) {
    return (
      <NoticeLayout type='general'>
        <div>로딩 중...</div>
      </NoticeLayout>
    );
  }

  return (
    <NoticeLayout type='general'>
      <AnimatedNoticeList noticeData={noticeData} />
    </NoticeLayout>
  );
}
```

---

## 🔍 검색 키워드 로그 적재 조건

백엔드에서 다음 조건을 모두 만족할 때 키워드 로그를 저장합니다:

1. **`page=0`** - 첫 페이지
2. **`keyword` 존재** - 검색어 입력됨
3. **모든 카테고리가 `COLLEGE_*` 형식**
4. **`GENERAL` 또는 `ACADEMIC` 미포함**
5. **키워드 2글자 이상** (정규화 후)

---

## 📊 페이지네이션 활용

```tsx
const { page, size, totalElements, totalPages, hasNext, hasPrevious } =
  noticeData;

// 페이지 정보 표시
<div className='pagination-info'>
  {page + 1} / {totalPages} 페이지 (전체 {totalElements}개)
</div>;

// 이전/다음 버튼
<button disabled={!hasPrevious} onClick={() => loadPage(page - 1)}>
  이전
</button>;
<button disabled={!hasNext} onClick={() => loadPage(page + 1)}>
  다음
</button>;
```

---

## ✅ 체크리스트

- [x] `Notice` 타입에 `id` 필드 추가
- [x] `NoticeApiResponse`에 페이지네이션 필드 추가
- [x] `AnimatedNoticeList` 단일 props로 단순화
- [x] HOT 공지사항 자동 최상단 표시
- [x] 더미 데이터 실제 API 구조로 변경
- [x] API 문서 작성
- [x] 날짜 형식 `YYYY-MM-DD`로 통일

---

## 🚀 배포 전 확인사항

1. **백엔드 API 엔드포인트 확인**
   - `/notices/search` 경로 확인
   - 쿼리 파라미터 형식 확인

2. **환경 변수 설정**
   - API Base URL 설정
   - CORS 설정 확인

3. **에러 처리**
   - API 호출 실패 시 처리
   - 빈 데이터 처리
   - 로딩 상태 표시

4. **성능 최적화**
   - React Query 또는 SWR 도입 고려
   - 캐싱 전략 수립
   - 페이지네이션 최적화

---

## 📚 관련 문서

- [API 응답 형식 가이드](./API_RESPONSE_FORMATS.md)
- [스타일링 아키텍처](./STYLING_ARCHITECTURE.md)

---

**구현 완료! 백엔드 API와 완벽하게 호환됩니다.** 🎉

