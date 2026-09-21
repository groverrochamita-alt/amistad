import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // En producción permite cualquier origen (Railway asigna URL dinámica al frontend)
  // En desarrollo solo permite localhost
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  app.enableCors({
    origin: [allowedOrigin, /\.railway\.app$/],
    methods: ['GET', 'POST'],
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend corriendo en puerto ${port}`);
}
bootstrap();
