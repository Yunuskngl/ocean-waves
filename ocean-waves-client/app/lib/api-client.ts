import axios, { AxiosInstance } from "axios";

export const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10_000,
  });
};

export const apiClient = createAxiosInstance();