import { TokenPayloadDTO } from "src/domain/dto/token-payload";

export interface TokenService {
  generateToken(tokenPayloadDTO: TokenPayloadDTO): string;
  parseToken(token: string): object;
}

export const TOKEN_SERVICE = 'TOKEN_SERVICE';
