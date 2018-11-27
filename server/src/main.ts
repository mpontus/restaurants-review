import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import cors from 'cors';
import { seedMiddleware } from 'middleware/seedMiddleware';
import * as path from 'path';
import { AppModule } from './app.module';

/**
 * Entry point of the application
 *
 * Launches HTTP server and queue listeners.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  // Seed controller is used to provide API endpoints for UI tests and
  // is activated using a special environment variable.
  if (process.env.SEED_MODULE) {
    app.use(
      '/seed',
      seedMiddleware(
        app as NestApplication,
        path.resolve(__dirname, '../test/seed/*.ts'),
      ),
    );
  }

  // Link DI container to class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder()
    .setTitle('Restaurants App API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [],
  });

  SwaggerModule.setup('swagger', app, document);

  await app.listen(parseInt(process.env.PORT || '8080', 10));
}

// tslint:disable-next-line:no-floating-promises
bootstrap();
