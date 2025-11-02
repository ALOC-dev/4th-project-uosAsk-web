export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface RequestChatParams {
  // department?: string | string[];
  query: string;
  conversation_history?: ConversationMessage[];
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

// 실제 API 응답 구조
export interface ChatResponse {
  found: boolean;
  assistant: string;
  recommended_notice?: RecommendedNotice | null;
  // API 문서에 따른 응답 구조도 지원 (선택적)
  response?: string;
  turn?: number;
}
