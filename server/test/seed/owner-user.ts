import { NestApplication } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { PlaceEntity } from 'places/entity/place.entity';
import { ReviewEntity } from 'reviews/entity/review.entity';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

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

export const author = {
  id: '9b6c8b74-9961-518b-9a33-8a26d564e883',
  name: 'Lucinda Reid',
  roles: ['user'],
};

export const reviews = [
  [
    'be543903-6fbc-5df3-bd31-4256624cc898',
    2,
    '2001-07-05',
    'Party environment control quality full less painting.',
    null,
  ],
  [
    'd8320717-05e2-5fd0-83ee-0c36d13b55e1',
    4,
    '2012-05-22',
    'Field return long bed after.',
    'Party environment control quality full less painting.',
  ],
  [
    '93aa6df2-8c47-54b1-8445-4152fe33ab41',
    1,
    '1986-01-24',
    'Serious inside else memory if six.',
    null,
  ],
  [
    'a414e5ec-e52b-597a-9b1d-527895a781fb',
    1,
    '1973-11-06',
    'State machine energy a production like service.',
    'Serious inside else memory if six.',
  ],
  [
    '1fc8006f-22b9-5b20-8b48-0c31861c4558',
    3,
    '1986-01-24',
    'Way house answer start behind old.',
    'Serious inside else memory if six.',
  ],
].map(([reviewId, rating, createdAt, comment, reply]) => ({
  id: reviewId,
  rating,
  createdAt,
  comment,
  reply,
}));

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

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values(author)
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(ReviewEntity)
    .values(
      reviews.map((review: any) => ({
        ...review,
        author: { id: author.id },
        place: { id: place.id },
        pendingFor: review.reply ? null : id,
      })),
    )
    .execute();

  await Promise.all([
    nestApp.get(Redis).hmset(`access_tokens:${accessToken}`, sessionData),
    nestApp.get(Redis).hmset(`refresh_tokens:${refreshToken}`, sessionData),
  ]);
};
