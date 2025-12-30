import { AuthenticationServiceModule } from "src/service/authentication/authentication.module";
import { ProfileController } from "./profile.controller";
import { Module } from "@nestjs/common";
import { AccessTokenMiddlewareModule } from "src/middleware/access-token/access-token-middleware.module";

@Module({
  imports: [AuthenticationServiceModule, AccessTokenMiddlewareModule],
  controllers: [ProfileController],
})
export class ProfileControllerModule {}