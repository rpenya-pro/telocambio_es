import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(compression());
  app.use(helmet()); // Asegúrate de que helmet se invoca como una función aquí

  await app.listen(3000);
}
bootstrap();
