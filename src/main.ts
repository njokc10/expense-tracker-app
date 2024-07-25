import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Config } from '~common/config/config';
import { requestHandlerMiddleware } from '~common/http/request-handler.helper';
import { ValidationError } from '~common/error/validation.error';
import { flatten } from '~utils/validation';
import { AllExceptionsFilter } from '~common/http/exception-response.helper';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    abortOnError: false,
  });

  const rootConfig = app.get(Config);

  const logger = app.get(Logger);
  app.useLogger(logger);
  // This enables error cause stack in the logs
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.use(requestHandlerMiddleware());

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (fieldErrors) => {
        const err = new ValidationError(flatten(fieldErrors));
        return err;
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('Expense Tracker API')
    .setDescription('API docs for Expense Tracker API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(rootConfig.app.port);

  logger.log(`Using configuration for "${process.env.NODE_ENV}" environment.`);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((error) => {
  PinoLogger.root.error(error.message, error, 'Biitstrap');
  process.exit(1);
});
