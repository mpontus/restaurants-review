import {MigrationInterface, QueryRunner} from "typeorm";

export class reviewPlaceAuthorUniqueConstraint1543128801561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_c2e81e1ba668879931edb610e5"`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "UQ_c2e81e1ba668879931edb610e5c" UNIQUE ("placeId", "authorId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "UQ_c2e81e1ba668879931edb610e5c"`);
        await queryRunner.query(`CREATE INDEX "IDX_c2e81e1ba668879931edb610e5" ON "review_entity"  ("placeId", "authorId") `);
    }

}
