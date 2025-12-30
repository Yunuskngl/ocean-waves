import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AccessTokenAuthGuard } from "src/middleware/access-token/access-token.guard";
import { AuthenticationService } from "src/service/authentication/authentication.service";

@Controller('profile')
@UseGuards(AccessTokenAuthGuard)
export class ProfileController {
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('me')
    async getMe(@Req() req: Request) {
        const payload = req.accessTokenPayload;
        return this.authenticationService.getMe(payload!.userId!);
    }
}