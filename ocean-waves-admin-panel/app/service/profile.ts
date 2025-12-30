import { protectedApiClient } from "../lib/authenticated-api-interceptor/api-client-interceptor";

const API_ENDPOINTS = {
    GET_ME: '/api/v1/profile/me',
} as const;

export async function getMe() {
    const response = await protectedApiClient.post(API_ENDPOINTS.GET_ME);
    return response.data;
}