import { MigrationInterface, QueryRunner } from 'typeorm';

export class userConstraints1543046004798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "name" TYPE character varying(60)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "email" TYPE character varying(60)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "passwordHash" TYPE character varying(60)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "passwordHash" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "email" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_entity" ALTER COLUMN "name" TYPE character varying`,
    );
  }
}
