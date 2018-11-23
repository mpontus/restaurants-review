import {MigrationInterface, QueryRunner} from "typeorm";

export class addIndexOnReviewAuthor1543001431900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE INDEX "IDX_c2e81e1ba668879931edb610e5" ON "review_entity"  ("placeId", "authorId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_c2e81e1ba668879931edb610e5"`);
    }

}
