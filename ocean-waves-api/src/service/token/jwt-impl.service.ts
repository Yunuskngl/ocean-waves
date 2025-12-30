import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenService } from './token-service';
import { TokenPayloadDTO } from 'src/domain/dto/token-payload';

@Injectable()
export class JwtTokenService implements TokenService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env.JWT_SECRET ?? 'dev-secret-change-me';
  }

  generateToken(tokenPayloadDTO: TokenPayloadDTO): string {
    const { expirationMs, claims } = tokenPayloadDTO;
    const expiresInSeconds = Math.floor(expirationMs / 1000);
    return jwt.sign(claims as any, this.secret, {
      expiresIn: expiresInSeconds,
    });
  }

  parseToken(token: string): object {
    const decoded = jwt.verify(token, this.secret);
    return decoded as object;
  }
}
