import { TokenType } from "generated/prisma/enums";

export interface GenerateTokenContext {
  userId: string;
  email?: string;
  tokenVersion?: number;
  additionalClaims?: Record<string, any>;
}

export interface TokenLifecycle {
  readonly type: TokenType;
  generateToken(context: GenerateTokenContext): Promise<string>;
  parseToken<TPayload = any>(token: string): TPayload;
}

export interface ValidateTokenPayload<TPayload = any> {
  validateTokenPayload(token: string): Promise<TPayload>;
}

export interface ValidateTokenRecord {
  validateTokenRecord(token: string): Promise<void>;
}

export interface InvalidateTokenRecord {
  invalidateTokenRecord(token: string): Promise<void>;
}

export interface GetTokenRecordOrThrow<TokenRecord = unknown> {
  getTokenRecordOrThrow(token: string): Promise<TokenRecord>;
}
