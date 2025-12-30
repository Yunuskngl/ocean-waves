import { apiClient } from "../lib/api-client";
import { Inquiry } from "../types/inquiry";

export const createInquiry = async (inquiry:Inquiry) => {
    const response = await apiClient.post('/api/v1/inquiry/create-inquiry', inquiry);
    return response.data;
}