import { protectedApiClient } from "../lib/authenticated-api-interceptor/api-client-interceptor";

const API_ENDPOINTS = {
    GET_INQUIRIES: '/api/v1/inquiry/get-inquiries',
    DELETE: '/api/v1/inquiry/delete-inquiries',
} as const;

export async function getInquiries() {
    const response = await protectedApiClient.post(API_ENDPOINTS.GET_INQUIRIES);
    return response.data;
}

export async function deleteInquiries(ids: string[]) {
    const response = await protectedApiClient.delete(API_ENDPOINTS.DELETE, { data: ids });
    return response.data;
}