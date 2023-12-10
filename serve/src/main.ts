import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 生成 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('My Shop Application')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }, 'jwt')
    .addTag('Docs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // 注册全局验证器
  app.useGlobalPipes(new ValidationPipe());

  // 启动服务
  const port = 3000
  await app.listen(port);
  Logger.log(`Application listening on pot ${port}`)
}
bootstrap();
