import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { BackendErrorResponse } from "../../app/interface/api-error-response";

import { AuthSession } from "./auth-session";
import { AuthRefresher } from "./auth-refresher";
import { refreshAccessToken } from "../../app/service/auth";
import { shouldAttemptTokenRefresh } from "./error-classifier";
import { attachAccessToken, markRequestAsRetried } from "./request-metadata";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };
const currentAuthSession = new AuthSession();
const refreshManager = new AuthRefresher(refreshAccessToken, currentAuthSession);

export const protectedApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10_000,
});

protectedApiClient.interceptors.request.use((config) => {
  const accessToken = currentAuthSession.getAccessToken();
  if (accessToken) {
    attachAccessToken(config, accessToken);
  }
  return config;
});

protectedApiClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<BackendErrorResponse>) => {
    const originalRequest = error.config as RetriableConfig | undefined;
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    if (shouldAttemptTokenRefresh(error, originalRequest)) {
      try {
        markRequestAsRetried(originalRequest);
        const freshToken = await refreshManager.refreshAccessToken();
        attachAccessToken(originalRequest, freshToken);
        return protectedApiClient(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
