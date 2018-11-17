import {MigrationInterface, QueryRunner} from "typeorm";

export class adjustPlaceSchema1542476118506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "ownerId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "title" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "address" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" float NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_5ee6bfb48852f01a7dd1274869" ON "place_entity"  ("ownerId", "rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`DROP INDEX "IDX_5ee6bfb48852f01a7dd1274869"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "ownerId" character varying NOT NULL`);
    }

}
