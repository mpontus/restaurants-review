import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from '../../src/app.module';

export const initApp = async () => {
  const nestApp = await NestFactory.create(AppModule, { logger: false });

  // Link DI container to class-validator
  useContainer(nestApp.select(AppModule), { fallbackOnErrors: true });

  await nestApp.init();

  return nestApp;
};
