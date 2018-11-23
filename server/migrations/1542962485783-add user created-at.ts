import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserCreatedAt1542962485783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" DROP COLUMN "createdAt"`,
    );
  }
}
