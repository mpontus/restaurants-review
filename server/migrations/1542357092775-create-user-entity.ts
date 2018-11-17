import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserEntity1542357092775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL, "email" text, "passwordHash" text, "roles" json NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
