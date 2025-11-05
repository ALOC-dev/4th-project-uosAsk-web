import axios, { AxiosInstance } from 'axios';

// baseURL 정의
// Next.js 클라이언트 사이드에서 환경 변수를 사용하려면 NEXT_PUBLIC_ 접두사가 필수
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_BASE_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL || undefined,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiClient: AxiosInstance = axios.create({
  baseURL: AI_BASE_URL || undefined,
  headers: {
    'Content-Type': 'application/json',
  },
});
