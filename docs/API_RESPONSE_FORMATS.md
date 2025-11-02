# API 응답 형식 가이드

## 📋 백엔드 API 응답 구조

### Notice 타입 정의

```typescript
export interface Notice {
  id: number;
  title: string;
  postedDate: string; // 형식: "YYYY-MM-DD"
  department: string;
  link: string;
  category: string; // 예: "GENERAL", "ACADEMIC", "COLLEGE_ENGINEERING" 등
  viewCount: number;
}
```

### API 응답 구조

```typescript
export interface NoticeApiResponse {
  hot: Notice[]; // HOT 공지사항 배열 (조회수 상위 3건)
  content: Notice[]; // 일반 공지사항 배열
  page: number; // 현재 페이지 번호 (0부터 시작)
  size: number; // 페이지당 항목 수
  totalElements: number; // 전체 공지사항 수
  totalPages: number; // 전체 페이지 수
  hasNext: boolean; // 다음 페이지 존재 여부
  hasPrevious: boolean; // 이전 페이지 존재 여부
}
```

---

## 🔥 HOT 공지사항 조건

**`hot` 배열에 포함되는 조건:**

1. **`exact=true`** (정확한 검색)
2. **`page=0`** (첫 페이지)
3. **`keyword`가 비어있음** (검색어 없음)

위 조건을 모두 만족할 때, **조회수 상위 3건**이 `hot` 배열에 포함됩니다.

---

## 📡 API 엔드포인트 예시

### 1. 일반공지 조회

```bash
GET /notices/search?category=GENERAL&page=0&size=15&exact=true
```

**응답 예시:**

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
    },
    {
      "id": 438,
      "title": "2025학년도 1학기 경영학부 수강신청 안내",
      "postedDate": "2025-02-20",
      "department": "경영학부",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=business&seq=2987",
      "category": "COLLEGE_BUSINESS",
      "viewCount": 5890
    },
    {
      "id": 429,
      "title": "2025학년도 1학기 세무학과 수강신청 안내",
      "postedDate": "2025-02-14",
      "department": "세무학과",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=econo01&seq=3018",
      "category": "COLLEGE_SOCIAL_SCIENCES",
      "viewCount": 5280
    }
  ],
  "content": [
    {
      "id": 1467,
      "title": "인공지능학과 취업멘토링[KT연구원] - 9.19(금) 15:00",
      "postedDate": "2025-09-15",
      "department": "인공지능학과",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=20013DA1&seq=15675",
      "category": "COLLEGE_ENGINEERING",
      "viewCount": 118
    },
    {
      "id": 270,
      "title": "[공학인증] 2025.1학기 공학교육인증 프로그램 이동(인증 → 비인증) 시행 안내 (1차)",
      "postedDate": "2025-05-30",
      "department": "공학교육혁신센터",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=20013DA1&seq=15486",
      "category": "COLLEGE_ENGINEERING",
      "viewCount": 144
    }
  ],
  "page": 0,
  "size": 15,
  "totalElements": 123,
  "totalPages": 9,
  "hasNext": true,
  "hasPrevious": false
}
```

### 2. 학과공지 조회 (단일 학과)

```bash
GET /notices/search?department=컴퓨터과학부&page=0&size=10&exact=true
```

### 3. 학과공지 조회 (복수 학과)

```bash
GET /notices/search?department=행정학과,국제관계학과&page=0&size=10&exact=true
```

### 4. 키워드 검색 (HOT 비활성화)

```bash
GET /notices/search?department=행정학과,국제관계학과&keyword=장학&page=0&size=10
```

**응답 예시 (HOT 없음):**

```json
{
  "hot": [], // 키워드 검색 시 HOT 배열은 비어있음
  "content": [
    {
      "id": 567,
      "title": "2025학년도 1학기 장학금 신청 안내",
      "postedDate": "2025-02-10",
      "department": "행정학과",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=admin&seq=567",
      "category": "COLLEGE_SOCIAL_SCIENCES",
      "viewCount": 890
    }
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

## 🔍 검색 키워드 로그 적재 조건

**키워드 로그가 저장되는 조건:**

1. **`page=0`** (첫 페이지)
2. **`keyword`가 존재함** (검색어 입력)
3. **모든 카테고리가 `COLLEGE_*` 형식**
4. **`GENERAL` 또는 `ACADEMIC` 카테고리가 포함되지 않음**
5. **키워드가 2글자 이상** (정규화 후)

---

## 🎨 프론트엔드 사용 방법

### 컴포넌트에서 사용

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
      const response = await fetch(
        '/api/notices/search?category=GENERAL&page=0&size=15&exact=true',
      );
      const data = await response.json();
      setNoticeData(data);
    };

    fetchNotices();
  }, []);

  if (!noticeData) return <div>로딩 중...</div>;

  return (
    <NoticeLayout type='general'>
      <AnimatedNoticeList noticeData={noticeData} />
    </NoticeLayout>
  );
}
```

### HOT 공지사항 UI

**HOT 배열에 포함된 공지사항:**

- ✅ **HOT!** 뱃지 표시
- ✅ 카드 스타일 (배경색, 그림자, 둥근 모서리)
- ✅ 호버 시 위로 떠오르는 애니메이션
- ✅ 목록 최상단에 우선 표시

**content 배열의 일반 공지사항:**

- ✅ 리스트 스타일 (투명 배경)
- ✅ HOT 공지사항 다음에 표시

---

## 📊 페이지네이션 정보 활용

```tsx
const { page, size, totalElements, totalPages, hasNext, hasPrevious } =
  noticeData;

// 다음 페이지 버튼 활성화 여부
<button disabled={!hasNext}>다음 페이지</button>;

// 이전 페이지 버튼 활성화 여부
<button disabled={!hasPrevious}>이전 페이지</button>;

// 페이지 정보 표시
<div>
  {page + 1} / {totalPages} 페이지 (전체 {totalElements}개)
</div>;
```

---

## 🎯 카테고리 타입

```typescript
// 일반공지
'GENERAL';

// 학사공지
'ACADEMIC';

// 단과대학별
'COLLEGE_ENGINEERING'; // 공과대학
'COLLEGE_BUSINESS'; // 경영대학
'COLLEGE_SOCIAL_SCIENCES'; // 사회과학대학
'COLLEGE_HUMANITIES'; // 인문대학
'COLLEGE_NATURAL_SCIENCES'; // 자연과학대학
'COLLEGE_URBAN_SCIENCES'; // 도시과학대학
'COLLEGE_ARTS'; // 예술체육대학
```

---

## ✅ 요약

| 항목                 | 설명                                                 |
| -------------------- | ---------------------------------------------------- |
| **HOT 조건**         | `exact=true` + `page=0` + `keyword` 비어있음         |
| **HOT 개수**         | 조회수 상위 3건                                      |
| **날짜 형식**        | `YYYY-MM-DD`                                         |
| **페이지 시작**      | 0부터 시작                                           |
| **키워드 로그 조건** | `page=0` + 키워드 존재 + `COLLEGE_*` 카테고리만 포함 |

**백엔드 API 응답 구조에 맞춰 프론트엔드가 자동으로 HOT 공지사항을 최상단에 표시합니다!** 🎉
