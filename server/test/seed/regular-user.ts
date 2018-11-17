import { NestApplication } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

export const id = 'fc085146-a648-50e4-b3dc-9a4133e738fe';
export const email = 'uwezepgis@aku.cm';
export const password = '#(i9Z3OyGW';
export const passwordHash = bcrypt.hashSync(password, 6);
export const accessToken = jwt.sign(
  {
    sub: id,
    roles: ['user'],
  },
  process.env.JWT_SECRET || '',
);
export const refreshToken =
  '234b9a346d2369d08cabb15721a782dc5b3044729f2850454c777067ed4faf64';

export const run = async (nestApp: NestApplication) => {
  const sessionData = {
    accessToken,
    refreshToken,
    userId: id,
  };

  await Promise.all([
    nestApp
      .get(Connection)
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([{ id, email, passwordHash, roles: ['user'] }])
      .execute(),
    nestApp.get(Redis).hmset(`access_tokens:${accessToken}`, sessionData),
    nestApp.get(Redis).hmset(`refresh_tokens:${refreshToken}`, sessionData),
  ]);
};
