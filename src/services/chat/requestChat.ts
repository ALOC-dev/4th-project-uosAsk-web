import { aiClient } from "../api/client";
import { RequestChatParams, ChatResponse } from "./chat.types";

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