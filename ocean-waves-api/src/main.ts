import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import GetCorsConfiguration from './config/cors';
import { HttpExceptionFilter } from './middleware/controller-advice';
import { ApplicationExceptionFilter } from './middleware/application-advice';
import cookieParser from 'cookie-parser';;
import validationPipe from './config/validation-pipe';

// TODO: Add CSP
// TODO: Add rate limiting
// TODO: Add logging
// TODO: Add monitoring

function registerFatalHandlers() {
  const fatal = (err: any) => {
    console.error('FATAL:', err);
    process.exit(1);
  };

  process.on('uncaughtException', fatal);
  process.on('unhandledRejection', fatal);
}

async function bootstrap() {
  registerFatalHandlers();
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ApplicationExceptionFilter());
    app.enableCors(GetCorsConfiguration());
    app.use(cookieParser());
    app.useGlobalPipes(validationPipe);
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new HttpExceptionFilter());

    const PORT = process.env.PORT || 8081;
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
    console.log(`WebSocket server ready for connections`);
  } catch (error) {
    console.error('BOOTSTRAP FAILED:', error);
    process.exit(1);
  }
}

bootstrap();
