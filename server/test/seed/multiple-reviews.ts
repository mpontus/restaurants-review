import { NestApplication } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { PlaceEntity } from 'places/entity/place.entity';
import { ReviewEntity } from 'reviews/entity/review.entity';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

export const owner = {
  id: '7904bc6b-5cc4-5f6d-86e0-51477a7ebd9d',
  name: 'Chris Curtis',
  email: 'laura80@hotmail.com',
  password: 'kvg4#MXl)(',
  roles: ['user', 'owner'],
};

export const place = {
  id: '99ea5b8b-c27d-5560-a6a3-35f23fd8e83d',
  title: 'The Exhibit',
  address: '261 Alexandre Forks',
  bestReview: 'e9eb742d-6f01-5e3f-be96-f896ecd9e02a',
  worstReview: '70aa23d6-5681-50cf-9f15-ed50c286648f',
};

export const users = [
  ['3b7d0cf5-d8e2-59b9-8a18-70e452c75ab5', 'Hilma Johnson'],
  ['a176dee3-d811-5d78-885c-0855994b2741', 'Alyson Prosacco'],
  ['ff0aa1d1-9087-5504-a07d-24e4c92b88eb', 'Jackeline Ferry'],
  ['26f0c494-f22b-5132-ba40-3c5f5e59d6e6', 'Mr. Willis Prosacco'],
  ['a9d1c8bb-b8a7-51f6-9bbe-8065ebf30a74', 'Diana Sipes'],
  ['a30c810a-c1b7-5de6-8a96-de36acde8a7b', 'Dr. Rubye Grant'],
  ['16509e33-b3de-59a9-9364-2d2aeedd9c98', 'Mrs. Milan Towne'],
  ['723d4ca4-cf49-5435-83c6-a2c5fbef0068', 'Adaline Kreiger'],
  ['0885dc4c-b8d4-5c95-b228-09a94632ffed', 'Justine Goyette'],
  ['704e18a1-3b8a-5537-ac17-7bd06479a064', 'Vidal Sipes'],
  ['2c0f42e5-96db-514f-b533-488086d10649', 'Jalyn Dach'],
  ['11d7d17d-2a55-575e-ab22-097e187ccb3f', 'Aidan Leffler'],
  ['a611fbce-ac2d-5c88-a214-4eda98081c8c', "Asha O'Keefe"],
  ['dbdbe182-3386-57fd-9af4-10c2b5e3767d', 'Rebekah Wisoky'],
  ['fe0aed96-49f0-56e8-9355-6d8e693d9461', 'Payton Emard'],
  ['47b9d629-2e26-52ee-9be9-65f1bce5a602', 'Kaden Rice'],
  ['6d927645-6e34-5032-9401-0b4f287c7b26', 'Arthur Cole'],
  ['e87b42c3-f4c7-5953-a89b-f695f25362b1', 'Dr. Yazmin Spencer'],
  ['f4a44714-ab54-5847-90ae-71007141ef84', 'Ardella Schaden'],
  ['c0815ae3-a1a0-5415-82ab-1dc5ff7ebb34', 'Mrs. Arely Daniel'],
].map(([id, name]) => ({ id, name }));

export const reviews = [
  [
    '5219c32e-d087-50c0-b177-7f208abf97cb',
    users[0].id,
    2,
    'Distinctio voluptas aliquid vitae et harum et voluptatem nostrum.',
    '2009-01-18',
  ],
  [
    '5d7dfb9e-7ca1-5743-bb72-e54f23abbcbd',
    users[1].id,
    3,
    'Temporibus molestiae enim sunt quos sint id.',
    '1992-01-14',
  ],
  [
    'f0ca6108-f9ba-52bd-a265-e8360c91f82e',
    users[2].id,
    2,
    'Sed rerum officiis suscipit ut placeat saepe non repudiandae.',
    '2009-01-18',
  ],
  [
    '3211b3c8-2a5a-5e93-a9fb-2b0d2828d55e',
    users[3].id,
    4,
    'Debitis est illo aperiam voluptas.',
    '1986-01-24',
  ],
  [
    'd249e54b-5f99-5dd7-ab56-ed6815acf830',
    users[4].id,
    2,
    'Optio natus tempore totam qui.',
    '1992-01-14',
  ],
  [
    'e9eb742d-6f01-5e3f-be96-f896ecd9e02a',
    users[5].id,
    5,
    'Iure laborum earum et.',
    '1986-03-12',
  ],
  [
    'c177e416-17b7-5763-87b3-68e7aefed023',
    users[6].id,
    3,
    'Et aut omnis et dignissimos.',
    '1986-01-24',
  ],
  [
    '8fcc3c67-bf2e-5ae1-98c5-a315ef4c0a44',
    users[7].id,
    4,
    'Sed laborum quasi aperiam non unde quibusdam magni.',
    '1986-01-24',
  ],
  [
    '70aa23d6-5681-50cf-9f15-ed50c286648f',
    users[8].id,
    1,
    'Ea ipsa et voluptate nesciunt quas.',
    '2009-01-18',
  ],
  [
    '83cf3a08-4d02-5bbb-ba2f-dba86273a0a3',
    users[9].id,
    2,
    'Reprehenderit aut reprehenderit mollitia mollitia asperiores molestiae.',
    '1979-02-22',
  ],
  [
    'cfe4485a-855f-5e4f-834e-07b66b75faa6',
    users[10].id,
    3,
    'Qui rerum pariatur deleniti necessitatibus velit.',
    '1979-02-22',
  ],
  [
    '520f3237-c60f-55ba-82d0-5098c68a7c55',
    users[11].id,
    4,
    'Enim asperiores nam vel occaecati vero.',
    '1985-06-05',
  ],
  [
    '6e4d9465-97a7-51a4-bc5f-b2cfdc1afe2f',
    users[12].id,
    3,
    'Quaerat qui eius officiis maxime placeat.',
    '1979-02-22',
  ],
  [
    'ebc2b9a3-8fa2-552a-a82a-14bfc766f48b',
    users[13].id,
    4,
    'Quia qui provident et ut voluptas.',
    '1985-06-05',
  ],
  [
    'b549cbba-e08c-5de4-bc3b-18feb3c5785f',
    users[14].id,
    4,
    'Recusandae sit voluptas voluptatibus eveniet incidunt et sit eos.',
    '1973-11-06',
  ],
  [
    'db055d7c-d715-5c13-8a02-13f665ddca8c',
    users[15].id,
    2,
    'Sed magni aspernatur dolor.',
    '1986-01-24',
  ],
  [
    'da8b455e-b396-5957-9c77-f0bc0c7f2687',
    users[16].id,
    2,
    'Animi ducimus molestiae est hic enim cum ex voluptatem.',
    '1985-06-05',
  ],
  [
    'b29f9105-f8ac-52f9-aaa8-7b8258453db8',
    users[17].id,
    2,
    'Repudiandae eveniet ullam est.',
    '1992-01-14',
  ],
  [
    '8991d3bf-427f-5785-acca-80ced0e7c26a',
    users[18].id,
    4,
    'Dolorem laudantium sunt ut temporibus eum eius.',
    '1973-11-06',
  ],
  [
    '9e4d11a2-129c-595f-8ec9-d956abc5ebd1',
    users[19].id,
    4,
    'Vitae id aut.',
    '1992-01-14',
  ],
].map(([id, authorId, rating, comment, date]) => ({
  id,
  authorId,
  rating,
  comment,
  date,
}));

export const run = async (nestApp: NestApplication) => {
  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values({
      id: owner.id,
      name: owner.name,
      email: owner.email,
      passwordHash: bcrypt.hashSync(owner.password, 6),
      roles: owner.roles,
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
        roles: ['user'],
      })),
    )
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(PlaceEntity)
    .values({
      id: place.id,
      title: place.title,
      address: place.address,
      owner: { id: owner.id },
    } as any)
    .execute();

  await nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(ReviewEntity)
    .values(reviews.map((review: any) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      author: { id: review.authorId },
      place: { id: place.id },
      createdAt: review.date,
      pendingFor: owner.id,
    })) as any)
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
};
