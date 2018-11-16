import { getConnection } from 'typeorm';

export const resetDb = async () => {
  const connection = getConnection();

  await connection.dropDatabase();
  await connection.runMigrations();
};
