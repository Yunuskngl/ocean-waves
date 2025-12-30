import { LoginRequest } from '@/app/interface/login';
import { apiClient } from '@/app/lib/api-client';

const API_ENDPOINTS = {
    LOGIN: '/api/v1/auth/login',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH: '/api/v1/auth/refresh-access-token'
}

export async function login(payload: LoginRequest): Promise<{ accessToken: string }> {
    const response = await apiClient.post<{ accessToken: string }>(API_ENDPOINTS.LOGIN, payload);
    return response.data;
}

export async function refreshAccessToken(): Promise<{ accessToken: string }> {
    const response = await apiClient.post<{ accessToken: string }>(API_ENDPOINTS.REFRESH);
    return response.data
}

export async function logout(): Promise<{ accessToken: string }> {
    const response = await apiClient.post<{ accessToken: string }>(API_ENDPOINTS.LOGOUT);
    return response.data
}