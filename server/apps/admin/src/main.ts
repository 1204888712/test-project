import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors()

  // 静态文件托管
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })

  // 验证管道
  // class-validator class-transformer
  // 类型校验  数据转换
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('admin接口文档')
    .setDescription('admin')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3000
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/api-docs`);

}
bootstrap();
