export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface RequestChatParams {
  query: string;
  conversation_history?: ConversationMessage[];
}
