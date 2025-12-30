export interface ApplicationExceptionPayload {
  message: string;
  code?: string;
  cause?: unknown;
  exitCode?: number;
}

export class ApplicationException extends Error {
  public readonly code: string;
  public readonly cause?: unknown;
  public readonly exitCode: number;

  constructor({message, code, cause,exitCode = 1,}: ApplicationExceptionPayload) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.code = code ?? this.constructor.name;
    this.cause = cause;
    this.exitCode = exitCode;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
