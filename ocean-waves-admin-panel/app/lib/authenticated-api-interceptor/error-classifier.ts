import { HTTP_CODES } from "@/app/enums/http-code";
import { BackendErrorResponse } from "@/app/interface/api-error-response";
import { AxiosError, InternalAxiosRequestConfig } from "axios";


type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export function shouldAttemptTokenRefresh(
  error: AxiosError<BackendErrorResponse>,
  request?: RetriableConfig
): request is RetriableConfig {
  return isTokenExpiredError(error) && hasNotBeenRetriedYet(request);
}

export function isTokenExpiredError(
  error: AxiosError<BackendErrorResponse>
): boolean {
  return error.response?.data?.error?.code === HTTP_CODES.TOKEN_EXPIRED;
}

export function hasNotBeenRetriedYet(
  request?: RetriableConfig
): request is RetriableConfig {
  return Boolean(request && !request._retry);
}

