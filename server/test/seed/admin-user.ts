import { NestApplication } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

export const id = '56a8809b-3fc0-5400-8bbd-512e242cc91d';
export const name = 'Joshua Wood';
export const email = 'ket@vavojis.ax';
export const password = 'x6tnBEr4&i';
export const passwordHash = bcrypt.hashSync(password, 6);
export const refreshToken = '422cd5815f0f3315c54bb65e6969f650';
export const accessToken = jwt.sign(
  {
    sub: id,
    roles: ['user', 'owner', 'admin'],
  },
  process.env.JWT_SECRET || '',
);

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
      .values([
        { id, name, email, passwordHash, roles: ['user', 'owner', 'admin'] },
      ])
      .execute(),
    nestApp.get(Redis).hmset(`access_tokens:${accessToken}`, sessionData),
    nestApp.get(Redis).hmset(`refresh_tokens:${refreshToken}`, sessionData),
  ]);
};
