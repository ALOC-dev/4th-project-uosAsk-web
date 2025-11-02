export interface ConversationMesage {
    role: 'user' | 'assistant';
    content: string;
    timestape: string;
}

export interface RequestChatParams {
    // department?: string | string[];
    query: string;
    conversation_history?: ConversationMesage[];
}

interface RecommendedNotice {
    content: string;
    score: number;
    title: string;
    link: string;
    posted_data: string;
    department: string;
    category: string;
    doc_id: string;
}

export interface ChatResponse {
    response: string;
    turn: number;
    recommended_notice: RecommendedNotice | null;
}