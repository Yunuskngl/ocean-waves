export interface BaseExceptionPayload {
  message: string;
  code?: string;
  statusCode?: number;
  details?: unknown;
}

export class BaseException extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor({
    message,
    code,
    statusCode = 400,
    details,
  }: BaseExceptionPayload) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code ?? this.constructor.name;
    this.details = details;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
