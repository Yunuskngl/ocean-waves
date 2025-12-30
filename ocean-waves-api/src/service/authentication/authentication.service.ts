import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "generated/prisma/browser";
import { UserRegisterDto } from "src/domain/dto/request/user-register.dto";
import { BadRequestException } from "src/domain/exception/http-exception/bad-request-exception";
import { UserAlreadyExistsException } from "src/domain/exception/http-exception/user-already-exist";
import { UserRepository } from "src/repository/user/user.repository";
import { BcryptUtil } from "src/utils/bcrypt-util";
import { AccessTokenLifecycleService } from "../token-lifecycle/access-impl.service";
import { RefreshTokenLifecycleService } from "../token-lifecycle/refresh-impl.service";
import { SessionTokensDto } from "src/domain/dto/session-tokens.dto";
import { LoginDto } from "src/domain/dto/request/login.dto";
import { InvalidCredentialsException } from "src/domain/exception/http-exception/invalid-credentials-exception";
import { TokenInvalidException } from "src/domain/exception/http-exception/token-invalid-exception";
import { UserNotFoundException } from "src/domain/exception/http-exception/user-not-found-exception";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userRepository: UserRepository, 
        private readonly accessTokenLifecycle: AccessTokenLifecycleService,
        private readonly refreshTokenLifecycle: RefreshTokenLifecycleService) {}

    public async register(userRegisterDto: UserRegisterDto): Promise<SessionTokensDto> {
        await this.assertPasswordsMatch(userRegisterDto.password, userRegisterDto.confirmPassword);
        await this.assertEmailAvailable(userRegisterDto.email);
        const passwordHash = await BcryptUtil.hash(userRegisterDto.password);
        const user = await this.userRepository.create({
            email: userRegisterDto.email,
            password: passwordHash,
            fullName: userRegisterDto.fullName,
        });
        return await this.generateSessionTokensFromUser(user);
    }

    public async login(loginDto: LoginDto): Promise<SessionTokensDto> {
        const user = await this.getUserOrElseThrow(loginDto.email);
        await this.validatePassword(loginDto.password, user.password);
        return await this.generateSessionTokensFromUser(user);
    }

    public async refreshAccessToken(
        refreshToken: string,
      ): Promise<SessionTokensDto> {
        await this.refreshTokenLifecycle.validateTokenRecord(refreshToken);
        const payload = this.refreshTokenLifecycle.parseToken<{
          userId: string;
          email: string;
          role: string;
          tokenVersion: number;
        }>(refreshToken);
        const user = await this.getUserOrElseThrow(payload.email);
        this.checkUserTokenVersion(user, payload);
        await this.refreshTokenLifecycle.invalidateTokenRecord(refreshToken);
        return await this.generateSessionTokensFromUser(user);
    }

    public async logout(refreshToken: string): Promise<SessionTokensDto> {
        await this.refreshTokenLifecycle.validateTokenRecord(refreshToken);
        await this.refreshTokenLifecycle.invalidateTokenRecord(refreshToken);
        return { accessToken: '', refreshToken: '' };
    }

    public async getMe(userId: string) {
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) {
            throw new UserNotFoundException();
        }
        return {
          email: user.email,
          fullName: user.fullName,
        };
    }

    private async assertEmailAvailable(email: string): Promise<void> {
        const user = await this.userRepository.findOne({
            email: email,
        });
        if (user) {
            throw new UserAlreadyExistsException(email);
        }
    }

    private async assertPasswordsMatch(password: string, confirmPassword: string): Promise<void> {
        if (password !== confirmPassword) {
            throw new BadRequestException();
        }
    }

    private async getUserOrElseThrow(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ email });
        if (!user) {
          throw new InvalidCredentialsException();
        }
        return user;
    }
    
    private async validatePassword(
        password: string,
        passwordHash: string,
      ): Promise<void> {
        const isValid = await BcryptUtil.compare(password, passwordHash);
        if (!isValid) {
          throw new InvalidCredentialsException();
        }
    }

    private checkUserTokenVersion(
        user: User,
        tokenClaims: { tokenVersion: number },
      ): void {
        if (user.tokenVersion !== tokenClaims.tokenVersion) {
          throw new TokenInvalidException();
        }
      }
    
    private async generateSessionTokensFromUser(
        user: User,
      ): Promise<SessionTokensDto> {
        const context = {
          userId: user.id,
          email: user.email,
          tokenVersion: user.tokenVersion,
        };
        const [accessToken, refreshToken] = await Promise.all([
          this.accessTokenLifecycle.generateToken(context),
          this.refreshTokenLifecycle.generateToken(context),
        ]);
        return { accessToken, refreshToken };
    }
}