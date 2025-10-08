import { apiClient } from "../api/client";

interface GetPopularKeywordsParams {
    days: number,
    limit: number,
}

// Web 서비스에서 params 변경 예정 없음.
export const DEFAULT_PARAMS = {
    days: 30,
    limit: 5,
} as const satisfies GetPopularKeywordsParams;

export const getPopularKeywords = async () => {
    const response = await apiClient.get('/search/popular', { params: DEFAULT_PARAMS });

    return response.data;
}