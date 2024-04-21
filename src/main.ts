import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionInterceptor } from '@src/infrastructure/interceptors/exception.interceptor';
import { routesV1 } from '@config/app.routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder().build();

  const document = SwaggerModule.createDocument(app, options);
  document.tags = [
    routesV1.order.tagInfo,
    routesV1.product.tagInfo,
    routesV1.user.tagInfo,
    routesV1.wallet.tagInfo,
  ];
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(new ExceptionInterceptor());

  await app.listen(3000);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();
