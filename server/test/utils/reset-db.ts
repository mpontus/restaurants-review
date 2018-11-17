import { NestApplication } from '@nestjs/core';
import Redis from 'ioredis';
import { Connection } from 'typeorm';

export const resetDb = async (nestApp: NestApplication) => {
  await nestApp.get(Connection).dropDatabase();
  await nestApp.get(Connection).runMigrations();
  await nestApp.get(Redis).flushdb();
};
