import { NestApplication } from '@nestjs/core';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

export const users = [
  ['41a5bad8-9cb4-5881-b296-2eb316df862c', 'Betty Stokes', 'taneg@nosmo.tw'],
  ['38103bba-3208-5171-b3e7-d88c8cad95de', 'Hannah Burke', 'huhur@cverkob.cy'],
  ['ec96adce-52f1-5090-ab6e-c362f97336fd', 'Luis Weber', 'iloracwur@jom.ag'],
  ['9d636843-0d39-58f3-be26-e500aa3c5134', 'Vincent Valdez', 'sotputu@ezev.hm'],
  ['649a1a68-e236-5bd4-af1d-5312127650f3', 'Timothy Willis', 'ewsod@diato.pa'],
  ['ff4c62f5-c4f9-5984-a34b-f26d5229480b', 'Paul Jensen', 'bavva@kihusmo.nf'],
  ['454da2fe-bada-5f2e-81a8-64dd43469f27', 'Ethel Bennett', 'potsa@lo.sv'],
  ['92f3bdce-8f07-5645-96b9-b63feffe241e', 'Max Burgess', 'nehkih@wamfuga.sx'],
  ['92d3c50e-bfaa-5dd2-a076-14b8111e2914', 'Dennis Watts', 'betano@jur.gt'],
  ['7859b162-1226-5b8e-82af-2f22a95fc264', 'Billy Gonzalez', 'ficfem@ti.ng'],
  ['7a0b3665-4ad8-5ace-b3d3-02258764cbd6', 'Emily Herrera', 'ban@muhe.kw'],
].map(([id, name, email]) => ({ id, name, email }));

export const run = async (nestApp: NestApplication) =>
  nestApp
    .get(Connection)
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values(users.map(data => ({ ...data, roles: ['user'] })))
    .execute();
