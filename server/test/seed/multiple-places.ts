import * as bcrypt from 'bcrypt';
import { NestApplication } from '@nestjs/core';
import { Connection } from 'typeorm';
import { UserEntity } from 'user/entity/user.entity';
import { PlaceEntity } from 'places/entity/place.entity';

export const owner = {
  id: '19847462-80b4-5542-8ae4-3d89e7ee4967',
  name: 'Raymond Jefferson',
  email: 'fostereric@morales.net',
  password: 'FW9%!nRe$M',
  roles: ['user', 'owner'],
};

export const places = [
  [
    'd3973942-133b-55e4-920e-7b0033ab9d38',
    'The Noodle Farmer',
    '1187 Weskut Ridge',
  ],
  ['55b62c9d-d3f6-5973-80cc-ca2744b0c1a6', 'The Honor Goat', '375 Uciwa Loop'],
  [
    '821ea0ca-77af-5dd5-a15f-176fd4ce23a2',
    'The Dairy Laguna',
    '332 Ruvow Path',
  ],
  [
    '381424b3-ba66-5444-8d7a-a452071dc3b3',
    'The Bitter Window',
    '1253 Pusi Road',
  ],
  ['36241277-6054-5955-a823-6a0706710235', 'The Fire Grove', '1528 Aceer Way'],
  ['f2ff6a02-8f86-51f7-bd0e-50099e450c27', 'Shambles', '826 Cuzmav Ridge'],
  ['8242a55b-5a9d-5ca9-b296-eed08dcf2897', 'Amigos', '1467 Huzwas Highway'],
  ['6bf9374f-8abc-5942-b52e-fff076137298', 'Little China', '1915 Uzma Court'],
  ['d1c878c1-1474-5c83-b289-508f75b89a4f', 'The Hive', '1117 Nekli Glen'],
  ['dc1884c7-35da-5973-9893-f902839ff6ff', 'The Locket', '1006 Laet Manor'],
  [
    'ea7ace38-298a-556b-8395-48d49fd33c0d',
    'The Japanese Fence',
    '1483 Sezsac Heights',
  ],
  [
    '4416102f-3ff0-567f-adb8-bf3a5c353d9f',
    'The Bitter Window',
    '1485 Lihom Boulevard',
  ],
  [
    'd25bd8aa-ce6d-5936-8344-c767980bdac4',
    'The Fable Street',
    '1754 Lija Boulevard',
  ],
  [
    '08347a44-d09d-58c6-b198-163b9a0ed423',
    'The Mountain Vine',
    '1355 Pogol Parkway',
  ],
  ['2230ab56-ca08-55d2-8a82-8ef007547c31', 'The Silk Whale', '1230 Cejet Key'],
  ['cf34d948-1260-58e3-ad82-1d4335016dc0', 'Trinity', '85 Huvzu Terrace'],
  ['6b0ceb1b-e72c-5ef8-b0c6-c54455b5aba7', 'Rogue', '134 Medmon Path'],
  ['5e471995-53ec-55c1-900b-4e6f0a515f15', 'Forester', '1956 Epin Way'],
  ['3f1cbd55-82a0-5fb3-a103-473462261bd8', 'Happening', '289 Kakmop Way'],
  ['2d688467-2116-5d95-9195-13083b904496', 'Chapter', '39 Coko Turnpike'],
].map(([id, title, address]) => ({ id, title, address }));

export const run = async (nestApp: NestApplication) => {
  nestApp
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
    .into(PlaceEntity)
    .values(places.map(data => ({ ownerId: owner.id, ...data })))
    .execute();
};
