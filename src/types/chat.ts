export type SenderType = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  sender: SenderType;
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  imageUrl?: string;
  suggestions?: string[];
}
