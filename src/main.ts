import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Config } from '~common/config/config';
import { ValidationError } from '~common/error/validation.error';
import { flatten } from '~utils/validation';
import { AllExceptionsFilter } from '~common/http/exception-response.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rootConfig = app.get(Config);

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
}
bootstrap();
