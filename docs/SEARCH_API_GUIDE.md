# 검색 API 사용 가이드

## 📌 개요

검색 모달에서 입력한 검색어를 `keyword` 파라미터로 백엔드에 전달하여 공지사항을 검색합니다.

---

## 🔍 검색 플로우

```
사용자 입력 → 검색 모달 → URL 쿼리 전달 → 검색 페이지 → 백엔드 API 호출 → 결과 표시
```

### 1. 검색 모달 (`searchModal.tsx`)

사용자가 검색어를 입력하고 Enter 키를 누르면:

```tsx
// Enter 키 이벤트
if (e.key === 'Enter' && searchQuery.trim()) {
  // URL 쿼리로 검색어 전달
  router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  onClose();
}
```

**결과:** `/search?q=장학금` 페이지로 이동

---

### 2. 검색 페이지 (`src/app/search/page.tsx`)

URL 쿼리에서 검색어를 추출하고 백엔드 API 호출:

```tsx
const query = searchParams.get('q') || '';

// 백엔드 API 호출
const data = await searchNotices({
  keyword: query,      // ✅ keyword 파라미터로 검색어 전달
  page: 0,
  size: 15,
  exact: false,
});
```

---

### 3. 검색 API 함수 (`src/services/notice/searchNotices.ts`)

백엔드로 검색 요청 전송:

```typescript
export const searchNotices = async (
  params: SearchNoticesParams
): Promise<NoticeApiResponse> => {
  const queryParams = {
    keyword: params.keyword,  // ✅ 검색어
    page: params.page ?? 0,
    size: params.size ?? 15,
    exact: params.exact ?? false,
    ...(params.category && { category: params.category }),
    ...(params.department && { department: params.department }),
  };

  const response = await apiClient.get<NoticeApiResponse>('/notices/search', {
    params: queryParams,
  });

  return response.data;
};
```

---

## 📡 백엔드 API 요청 예시

### 기본 검색 (모든 카테고리)

```bash
GET /notices/search?keyword=장학금&page=0&size=15&exact=false
```

**쿼리 파라미터:**
- `keyword`: 검색어 (필수)
- `page`: 페이지 번호 (0부터 시작)
- `size`: 페이지당 항목 수
- `exact`: 정확한 검색 여부 (false = 부분 검색)

---

### 카테고리 지정 검색

```bash
GET /notices/search?keyword=수강신청&category=ACADEMIC&page=0&size=15&exact=false
```

**카테고리 옵션:**
- `GENERAL` - 일반공지
- `ACADEMIC` - 학사공지
- `COLLEGE_ENGINEERING` - 공과대학
- `COLLEGE_BUSINESS` - 경영대학
- `COLLEGE_SOCIAL_SCIENCES` - 사회과학대학
- 기타 `COLLEGE_*` 형식

---

### 학과 지정 검색

```bash
# 단일 학과
GET /notices/search?keyword=캡스톤&department=컴퓨터과학부&page=0&size=15

# 복수 학과 (쉼표로 구분)
GET /notices/search?keyword=장학&department=행정학과,국제관계학과&page=0&size=15
```

---

## 🎯 API 응답 구조

```typescript
interface NoticeApiResponse {
  hot: Notice[];           // 검색 시 빈 배열
  content: Notice[];       // 검색 결과
  page: number;
  size: number;
  totalElements: number;   // 전체 검색 결과 수
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### 응답 예시

```json
{
  "hot": [],  // 검색 시 HOT 공지사항 없음
  "content": [
    {
      "id": 8,
      "title": "[학생지원과] 2024학년도 2학기 장학금 신청 안내",
      "postedDate": "2024-09-30",
      "department": "학생지원과",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=general&seq=8",
      "category": "GENERAL",
      "viewCount": 409
    },
    {
      "id": 102,
      "title": "2024학년도 전과 및 복수전공 신청 안내",
      "postedDate": "2024-01-10",
      "department": "교무과",
      "link": "https://www.uos.ac.kr/korNotice/view.do?list_id=academic&seq=102",
      "category": "ACADEMIC",
      "viewCount": 5187
    }
  ],
  "page": 0,
  "size": 15,
  "totalElements": 2,
  "totalPages": 1,
  "hasNext": false,
  "hasPrevious": false
}
```

---

## 🔑 주요 특징

### 1. HOT 공지사항 비활성화

검색 시에는 `hot` 배열이 비어있습니다:
- `keyword`가 존재하면 HOT 조건 불만족
- 검색 결과는 모두 `content` 배열에 포함

### 2. 부분 검색 지원

```typescript
exact: false  // 부분 검색 (기본값)
```

- "장학" 검색 시 "장학금", "장학생", "국가장학금" 모두 검색됨

### 3. 로딩 및 에러 처리

```tsx
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// 로딩 상태
{isLoading ? (
  <NoResultsMessage>검색 중...</NoResultsMessage>
) : ...}

// 에러 상태
{error ? (
  <NoResultsMessage>{error}</NoResultsMessage>
) : ...}
```

---

## 📊 검색 결과 표시

### 검색 정보 헤더

```tsx
<SearchInfo>
  <SearchKeyword>{query}</SearchKeyword>
  <SearchCount>
    {searchResults.totalElements > 0
      ? `${searchResults.totalElements}개의 공지사항을 찾았습니다`
      : '검색 결과가 없습니다'}
  </SearchCount>
</SearchInfo>
```

### 검색 결과 목록

```tsx
{searchResults && searchResults.content.length > 0 ? (
  <AnimatedNoticeList noticeData={searchResults} />
) : (
  <NoResultsMessage>
    "{query}"에 대한 검색 결과가 없습니다
    <br />
    다른 검색어로 시도해보세요
  </NoResultsMessage>
)}
```

---

## 🚀 사용 예시

### 기본 검색

```typescript
import { searchNotices } from '@/services/notice/searchNotices';

// 모든 카테고리에서 "장학금" 검색
const results = await searchNotices({
  keyword: '장학금',
  page: 0,
  size: 15,
  exact: false,
});
```

### 카테고리 지정 검색

```typescript
// 학사공지에서만 "수강신청" 검색
const results = await searchNotices({
  keyword: '수강신청',
  category: 'ACADEMIC',
  page: 0,
  size: 15,
});
```

### 학과 지정 검색

```typescript
// 컴퓨터과학부 공지에서 "캡스톤" 검색
const results = await searchNotices({
  keyword: '캡스톤',
  department: '컴퓨터과학부',
  page: 0,
  size: 15,
});

// 복수 학과에서 검색
const results = await searchNotices({
  keyword: '장학',
  department: '행정학과,국제관계학과',
  page: 0,
  size: 15,
});
```

---

## 🔍 검색 키워드 로그 적재

백엔드에서 다음 조건을 만족할 때 검색 키워드를 로그에 저장합니다:

1. `page=0` (첫 페이지)
2. `keyword` 존재
3. 모든 카테고리가 `COLLEGE_*` 형식
4. `GENERAL` 또는 `ACADEMIC` 미포함
5. 키워드 2글자 이상 (정규화 후)

**예시:**
```bash
# ✅ 로그 저장됨
GET /notices/search?keyword=장학&department=컴퓨터과학부&page=0

# ❌ 로그 저장 안됨 (GENERAL 포함)
GET /notices/search?keyword=장학&category=GENERAL&page=0

# ❌ 로그 저장 안됨 (page가 0이 아님)
GET /notices/search?keyword=장학&department=컴퓨터과학부&page=1
```

---

## ✅ 체크리스트

- [x] 검색 모달에서 Enter 키로 검색 실행
- [x] URL 쿼리로 검색어 전달 (`?q=검색어`)
- [x] 백엔드 API에 `keyword` 파라미터로 전달
- [x] 로딩 상태 표시
- [x] 에러 처리
- [x] 검색 결과 표시
- [x] 빈 결과 처리
- [x] 페이지네이션 정보 활용 가능

---

## 📚 관련 파일

- `src/components/modal/searchModal.tsx` - 검색 모달
- `src/app/search/page.tsx` - 검색 결과 페이지
- `src/services/notice/searchNotices.ts` - 검색 API 함수
- `src/types/notice.ts` - 타입 정의

---

**검색 기능이 백엔드 API와 완벽하게 연동되었습니다!** 🔍✨

