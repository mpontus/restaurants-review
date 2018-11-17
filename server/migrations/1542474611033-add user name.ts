import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserName1542474611033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "name"`);
    }

}
