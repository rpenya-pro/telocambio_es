import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitando CORS específicamente para http://www.rafapenya.com
  app.enableCors({
    origin: 'http://www.rafapenya.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // app.use(compression());
  // app.use(helmet()); // Asegúrate de que helmet se invoca como una función aquí

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
