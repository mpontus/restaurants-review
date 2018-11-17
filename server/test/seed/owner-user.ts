import { NestApplication } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';
import { PlaceEntity } from 'places/entity/place.entity';

export const id = '3a32c6d2-8cc8-588c-9d50-30f06e30a3d3';
export const name = 'Norma Fisher';
export const email = 'curtischarles@diaz-brown.com';
export const password = '^u&Mt3&I52';
export const passwordHash = bcrypt.hashSync(password, 6);
export const accessToken = jwt.sign(
  {
    sub: id,
    roles: ['user', 'owner'],
  },
  process.env.JWT_SECRET || '',
);
export const refreshToken =
  '234b9a346d2369d08cabb15721a782dc5b3044729f2850454c777067ed4faf64';

export const place = {
  id: '05bd7b00-f274-5b91-9c48-08bfa24cb9bd',
  title: 'Nicolas - Satterfield',
  address: '262 Franecki Courts',
};

export const run = async (nestApp: NestApplication) => {
  const sessionData = {
    accessToken,
    refreshToken,
    userId: id,
  };

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values({ id, name, email, passwordHash, roles: ['user', 'owner'] })
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(PlaceEntity)
    .values({
      id: place.id,
      ownerId: id,
      title: place.title,
      address: place.address,
    })
    .execute();

  await Promise.all([
    nestApp.get(Redis).hmset(`access_tokens:${accessToken}`, sessionData),
    nestApp.get(Redis).hmset(`refresh_tokens:${refreshToken}`, sessionData),
  ]);
};
