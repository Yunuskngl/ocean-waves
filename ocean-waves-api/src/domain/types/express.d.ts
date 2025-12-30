import 'express-serve-static-core';
import { AccessTokenDTO } from '../dto/access-token.dto';

declare module 'express-serve-static-core' {
  interface Request {
    accessToken?: string;
    accessTokenPayload?: AccessTokenDTO;
  }
}
