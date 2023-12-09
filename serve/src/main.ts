import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(`Application listening on pot ${port}`)
}
bootstrap();
