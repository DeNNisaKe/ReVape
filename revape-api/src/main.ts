import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  console.log('API started on port 8080');
  await app.listen(8080);
}
bootstrap();
