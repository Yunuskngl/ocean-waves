export interface BackendErrorResponse {
    error: {
      message: string;
      code: string;
      details?: unknown;
    };
  };