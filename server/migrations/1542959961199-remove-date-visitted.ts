import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeDateVisitted1542959961199 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "review_entity" DROP COLUMN "dateVisitted"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "review_entity" ADD "dateVisitted" date NOT NULL`,
    );
  }
}
