import { aiClient } from "../api/client";

interface ConversationMesage {
    role: 'user' | 'assistant';
    content: string;
    timestape: string;
}

interface RequestChatParams {
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

interface ChatResponse {
    response: string;
    turn: number;
    recommended_notice: RecommendedNotice | null;
}

export const requestChat = async (params: RequestChatParams) => {
    try {
        const response = await aiClient.post<ChatResponse>(
            '/chat',
            params,
        );
        return response.data;
    } catch (error) {
        console.error('Requested Chat Error: ', error);
    }
};