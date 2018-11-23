import { MigrationInterface, QueryRunner } from 'typeorm';

export class addReviewCount1542985564049 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "place_entity" ADD "reviewCount" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "place_entity" DROP COLUMN "reviewCount"`,
    );
  }
}
