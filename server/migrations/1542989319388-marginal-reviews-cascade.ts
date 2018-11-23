import {MigrationInterface, QueryRunner} from "typeorm";

export class marginalReviewsCascade1542989319388 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_bd16f2c7c500a3578a45c60722d"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_41b40e9c7389990009cae5015ff"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_41b40e9c7389990009cae5015ff" FOREIGN KEY ("bestReviewId") REFERENCES "review_entity"("id") ON DELETE SET NULL`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_bd16f2c7c500a3578a45c60722d" FOREIGN KEY ("worstReviewId") REFERENCES "review_entity"("id") ON DELETE SET NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_bd16f2c7c500a3578a45c60722d"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_41b40e9c7389990009cae5015ff"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_41b40e9c7389990009cae5015ff" FOREIGN KEY ("bestReviewId") REFERENCES "review_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_bd16f2c7c500a3578a45c60722d" FOREIGN KEY ("worstReviewId") REFERENCES "review_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
