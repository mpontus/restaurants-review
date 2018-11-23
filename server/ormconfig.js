module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
