import * as bcrypt from 'bcrypt';
import { NestApplication } from '@nestjs/core';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';
import { PlaceEntity } from 'places/entity/place.entity';
import { ReviewEntity } from 'reviews/entity/review.entity';

export const owner = {
  id: '7904bc6b-5cc4-5f6d-86e0-51477a7ebd9d',
  name: 'Chris Curtis',
  email: 'laura80@hotmail.com',
  password: 'kvg4#MXl)(',
  roles: ['user', 'owner'],
};

export const author = {
  id: '01fe6835-d9d2-5de3-94aa-a23bc14b9c73',
  name: 'Norma Fisher',
  email: 'ngallagher@cole-pearson.info',
  password: '71bPiFy8)g',
  roles: ['user'],
};

export const place = {
  id: '99ea5b8b-c27d-5560-a6a3-35f23fd8e83d',
  title: 'The Exhibit',
  address: '261 Alexandre Forks',
};

export const reviews = [
  [
    '0a931d01-a888-5523-86d1-c89bacc0a22b',
    4.17,
    '2012-05-22',
    'Party environment control quality full less painting.',
  ],
  [
    'cbf76a7b-14e5-5ba3-9c4f-af96f24cd72d',
    3.45,
    '1996-03-20',
    'Have heart cover analysis carry.',
  ],
  [
    '58d1832e-b696-5c49-ac55-9a4beced3f9b',
    1.46,
    '1996-03-20',
    'Have heart cover analysis carry.',
  ],
  [
    '9ea7f963-47d2-5a2d-8b4d-782680d3b1bf',
    2.67,
    '2012-05-22',
    'Notice soon as brother.',
  ],
  [
    '07c76adf-2a28-5914-9128-d10c7d83f36b',
    2.89,
    '1979-02-22',
    'Before guess college speak.',
  ],
  [
    '88b4c16c-e3c5-539d-b4b5-b158f4c23667',
    2.06,
    '2009-01-18',
    'Notice soon as brother.',
  ],
  [
    '6bc794d6-e0fe-5913-9ea7-66219afce965',
    2.25,
    '1979-02-22',
    'Have heart cover analysis carry.',
  ],
  [
    'd8320717-05e2-5fd0-83ee-0c36d13b55e1',
    4.6,
    '2012-05-22',
    'Field return long bed after.',
  ],
  [
    'be543903-6fbc-5df3-bd31-4256624cc898',
    2.81,
    '2001-07-05',
    'Party environment control quality full less painting.',
  ],
  [
    '93aa6df2-8c47-54b1-8445-4152fe33ab41',
    1.46,
    '1986-01-24',
    'Serious inside else memory if six.',
  ],
  [
    'a414e5ec-e52b-597a-9b1d-527895a781fb',
    1.06,
    '1973-11-06',
    'State machine energy a production like service.',
  ],
  [
    '1fc8006f-22b9-5b20-8b48-0c31861c4558',
    3.06,
    '1986-01-24',
    'Way house answer start behind old.',
  ],
  [
    '613c0e6f-4087-5546-ae99-e2436fd68219',
    3.84,
    '2009-01-18',
    'Party environment control quality full less painting.',
  ],
  [
    'e6336264-dacd-59dc-8a16-f6e06351f47b',
    4.69,
    '1973-11-06',
    'Serious inside else memory if six.',
  ],
  [
    '700650e5-d979-5bfa-92e3-523f73036f9e',
    3.6,
    '1973-11-06',
    'Have heart cover analysis carry.',
  ],
  [
    '231a909a-6ce5-5c65-a053-5d2853d02b52',
    3.35,
    '1986-03-12',
    'Before guess college speak.',
  ],
].map(([id, rating, dateVisitted, comment]) => ({
  id,
  rating,
  dateVisitted,
  comment,
}));

export const run = async (nestApp: NestApplication) => {
  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values(
      [owner, author].map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: bcrypt.hashSync(user.password, 6),
        roles: user.roles,
      })),
    )
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(PlaceEntity)
    .values({
      ownerId: owner.id,
      ...place,
    })
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(ReviewEntity)
    .values(
      reviews.map((data: any) => ({
        ...data,
        place: { id: place.id },
        author: { id: author.id },
        pendingFor: owner.id,
      })),
    )
    .execute();
};
