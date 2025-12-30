import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserRegisterDto } from 'src/domain/dto/request/user-register.dto';
import { SessionTokensDto } from 'src/domain/dto/session-tokens.dto';
import { AuthenticationService } from 'src/service/authentication/authentication.service';
import { Request, Response } from 'express';
import { CookieUtil } from 'src/utils/refresh-cookie-util';
import { LoginDto } from 'src/domain/dto/request/login.dto';

@Controller('/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  
  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: UserRegisterDto, @Res({ passthrough: true }) res: Response,) {
    const authTokens: SessionTokensDto =
      await this.authenticationService.register(registerDto);
    const cookie = CookieUtil.createRefreshTokenCookie(authTokens.refreshToken);
    res.cookie(cookie.name, cookie.value, cookie.options);
    return { accessToken: authTokens.accessToken };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const authTokens: SessionTokensDto =
      await this.authenticationService.login(loginDto);
    const cookie = CookieUtil.createRefreshTokenCookie(authTokens.refreshToken);
    res.cookie(cookie.name, cookie.value, cookie.options);
    return { accessToken: authTokens.accessToken };
  }

  @Post('refresh-access-token')
  @HttpCode(200)
  async refreshAccessToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = CookieUtil.extractRefreshTokenFromCookies(req.cookies);
    const authTokens: SessionTokensDto =
      await this.authenticationService.refreshAccessToken(refreshToken);
    const cookie = CookieUtil.createRefreshTokenCookie(authTokens.refreshToken);
    res.cookie(cookie.name, cookie.value, cookie.options);
    return { accessToken: authTokens.accessToken };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = CookieUtil.extractRefreshTokenFromCookies(req.cookies);
    const authTokens = await this.authenticationService.logout(refreshToken);
    const cookie = CookieUtil.clearRefreshTokenCookie();
    res.cookie(cookie.name, cookie.value, cookie.options);
    return { accessToken: authTokens.accessToken };
  }
}
