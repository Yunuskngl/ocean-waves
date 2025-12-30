import { apiClient } from "../lib/api-client";

const API_ENDPOINTS = {
  GET_PRODUCTS: 'api/v1/product-management/get-products',
}

export const getProducts = async () => {
  const response = await apiClient.get(API_ENDPOINTS.GET_PRODUCTS);
  return response.data;
}