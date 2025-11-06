// UI 컴포넌트에서 사용하는 채팅 메시지 타입
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface RecommendedNotice {
  content: string;
  score: number;
  title: string;
  link: string;
  posted_date: string;
  department: string;
  category: string;
  doc_id: string;
}

// API 응답을 UI에서 사용하는 형태로 변환한 타입
export interface UIChatResponse {
  message: string;
  recommendedNotice?: RecommendedNotice | null;
}
