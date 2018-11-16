import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../src/app.module';

export const initApp = async () => {
  const nestApp = await NestFactory.create(AppModule, { logger: false });

  await nestApp.init();

  return nestApp;
};
