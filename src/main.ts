import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { Log4jsLogger } from '@nestx-log4js/core';
import { addSalt } from './utils/encription';

const listenPort = 3000;
const logger = new Logger('main.ts');

/**
 * 主方法
 */
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  /**
   * 配置 swagger
   */
  const config = new DocumentBuilder()
    .setTitle('项目管理平台')
    .setDescription('xxxxx平台接口文档')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt',
    )
    // .addTag('demo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  /**
   * 使用 log4.js
   */
  app.useLogger(app.get(Log4jsLogger));

  /**
   * 允许跨域
   */
  app.enableCors();

  // console.log(`listen in http://localhost:${listenPort}`);
  // logger.log(`listen in http://localhost:${listenPort}/swagger-ui`);
  await app.listen(listenPort);
};
bootstrap().then(() => {
  addSalt();
  logger.log(`listen in http://localhost:${listenPort}/swagger-ui`);
});
