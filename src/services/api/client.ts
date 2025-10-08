import axios, { AxiosInstance } from "axios";

// baseURL 정의
const API_BASE_URL = process.env.API_BASE_URL;
const AI_BASE_URL = process.env.AI_BASE_URL;

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export const aiClient: AxiosInstance = axios.create({
    baseURL: AI_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});