import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { InternalServerExceptionFilter } from './common/filters/internal-server-exception.filter';
import { PageNotFoundExceptionFilter } from './common/filters/page-not-found-exception.filter';
import { ValidationException } from './common/filters/exceptions/validation.exception';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );

  app.useGlobalFilters(
    new InternalServerExceptionFilter(),
    new ValidationExceptionFilter(),
    new PageNotFoundExceptionFilter(),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  if (process.env.ENV !== 'production') {
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(9001);
}
bootstrap();
