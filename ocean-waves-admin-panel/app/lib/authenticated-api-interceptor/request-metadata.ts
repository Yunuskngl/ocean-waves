import { InternalAxiosRequestConfig } from "axios";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export function markRequestAsRetried(request: RetriableConfig): void {
  request._retry = true;
}

export function attachAccessToken(
  request: RetriableConfig,
  accessToken: string
): void {
  request.headers = request.headers ?? {};
  request.headers.Authorization = `Bearer ${accessToken}`;
}
