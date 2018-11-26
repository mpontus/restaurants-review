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
  bestReview: 'd8320717-05e2-5fd0-83ee-0c36d13b55e1',
  worstReview: '93aa6df2-8c47-54b1-8445-4152fe33ab41',
};

export const author = {
  id: '9b6c8b74-9961-518b-9a33-8a26d564e883',
  name: 'Lucinda Reid',
  roles: ['user'],
};

export const users = [
  [
    '7177e22e-ee35-5eea-aef9-38031272a696',
    'Shayna Kulas',
    'Brandyn.Pfannerstill86@gmail.com',
  ],
  [
    'eca0b215-72a3-5690-bc01-9073659f017b',
    'Trenton Kessler',
    'Diana53@gmail.com',
  ],
  [
    '8310ec47-f611-5a29-9fbc-b9b5e1d48977',
    'Christina Friesen',
    'Kennith9@hotmail.com',
  ],
  [
    'a4b252ff-9f36-5d6e-8a2c-0c0a3172e9cb',
    'Marcos VonRueden',
    'Torey_Wunsch44@yahoo.com',
  ],
  [
    'b14d5490-cc44-582b-be03-e578a977cb9c',
    'Ms. Maximo Jacobson',
    'Gene_White18@yahoo.com',
  ],
  [
    '356f3bd6-e51e-5cad-9a84-99299ff75a6e',
    'Dino Kuhic',
    'Elsa.Hayes84@gmail.com',
  ],
].map(
  // tslint:disable-next-line:no-shadowed-variable
  ([id, name, email]) => ({ id, name, email, reply: null }),
);

export const pendingReviews = [
  [
    'be543903-6fbc-5df3-bd31-4256624cc898',
    users[0].id,
    2,
    '2001-07-05',
    'Party environment control quality full less painting.',
  ],
  [
    '93aa6df2-8c47-54b1-8445-4152fe33ab41',
    users[2].id,
    1,
    '1986-01-24',
    'Serious inside else memory if six.',
  ],
].map(([reviewId, authorId, rating, createdAt, comment]) => ({
  id: reviewId,
  authorId,
  rating,
  createdAt,
  comment,
  pendingFor: id,
}));

export const answeredReviews = [
  [
    'd8320717-05e2-5fd0-83ee-0c36d13b55e1',
    users[1].id,
    4,
    '2012-05-22',
    'Field return long bed after.',
    'Party environment control quality full less painting.',
  ],
  [
    'a414e5ec-e52b-597a-9b1d-527895a781fb',
    users[3].id,
    2,
    '1973-11-06',
    'State machine energy a production like service.',
    'Serious inside else memory if six.',
  ],
  [
    '1fc8006f-22b9-5b20-8b48-0c31861c4558',
    users[4].id,
    3,
    '1986-01-24',
    'Way house answer start behind old.',
    'Serious inside else memory if six.',
  ],
].map(([reviewId, authorId, rating, createdAt, comment, reply]) => ({
  id: reviewId,
  authorId,
  rating,
  createdAt,
  comment,
  reply,
}));

export const reviews = [...pendingReviews, ...answeredReviews];

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
    .values({ id, name, email, passwordHash, roles: ['owner'] })
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
    .values(
      users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        roles: ['user'],
      })),
    )
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(ReviewEntity)
    .values([
      ...reviews.map((review: any) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        author: { id: review.authorId } as any,
        place: { id: place.id } as any,
        createdAt: review.createdAt,
        reply: review.reply,
        pendingFor: review.reply ? null : id,
      })),
    ])
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .update(PlaceEntity)
    .set({
      bestReview: { id: place.bestReview },
      worstReview: { id: place.worstReview },
    })
    .where({ id: place.id })
    .execute();

  await Promise.all([
    nestApp.get(Redis).hmset(`access_tokens:${accessToken}`, sessionData),
    nestApp.get(Redis).hmset(`refresh_tokens:${refreshToken}`, sessionData),
  ]);
};
