import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';

export const id = 'fc085146-a648-50e4-b3dc-9a4133e738fe';
export const email = 'uwezepgis@aku.cm';
export const password = '#(i9Z3OyGW';
export const passwordHash = bcrypt.hashSync(password, 6);

export const run = async () =>
  getConnection()
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values([{ id, email, passwordHash, roles: ['user'] }])
    .execute();
