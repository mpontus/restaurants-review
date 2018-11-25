import {MigrationInterface, QueryRunner} from "typeorm";

export class adjustColumnDefinitions1542989183462 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_8ce12888af95af29a349162daa"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD "rating" smallint NOT NULL DEFAULT 0`);
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" real NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_8ce12888af95af29a349162daa" ON "review_entity"  ("placeId", "rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`DROP INDEX "IDX_8ce12888af95af29a349162daa"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" double precision NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD "rating" double precision NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_8ce12888af95af29a349162daa" ON "review_entity"  ("rating", "placeId") `);
    }

}
