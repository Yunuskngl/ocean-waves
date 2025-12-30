import { ApplicationException } from "./base-exception";

export class DatabaseConnectionException extends ApplicationException {
  constructor(cause?: unknown) {
    super({
      message: 'Database connection failed. Application cannot continue.',
      code: 'DB_CONNECTION_FAILED',
      cause,
      exitCode: 1,
    });
  }
}
