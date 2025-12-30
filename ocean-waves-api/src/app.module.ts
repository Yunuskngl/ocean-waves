import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './config/prisma/prisma.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./resources/.env.${process.env.NODE_ENV || 'dev'}`,
    }),
    PrismaModule,
    ControllerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
