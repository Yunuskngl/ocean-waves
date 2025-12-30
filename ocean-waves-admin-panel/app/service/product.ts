import { ProductData } from "../interface/product-create";
import { protectedApiClient } from "../lib/authenticated-api-interceptor/api-client-interceptor";

const API_ENDPOINTS = {
    CREATE: '/api/v1/product-management/create',
    GET_PRODUCTS: '/api/v1/product-management/get-products',
    UPDATE: '/api/v1/product-management/update',
    DELETE: '/api/v1/product-management/delete',
} as const;

export async function createProduct(product:ProductData) {
    const response = await protectedApiClient.post(API_ENDPOINTS.CREATE, product);
    return response.data;
}

export async function getProducts() {
    const response = await protectedApiClient.get(API_ENDPOINTS.GET_PRODUCTS);
    return response.data;
}

export async function updateProduct(updateData: ProductData, productId: string) {
    const response = await protectedApiClient.put(`${API_ENDPOINTS.UPDATE}/${productId}`, updateData);
    return response.data;
}

export async function deleteProducts(productIds: string[]) {
    const response = await protectedApiClient.delete(API_ENDPOINTS.DELETE, { data: productIds });
    return response.data;
}