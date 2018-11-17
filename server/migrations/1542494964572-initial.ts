import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1542494964572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "place_entity" ("id" uuid NOT NULL, "ownerId" uuid NOT NULL, "title" character varying(60) NOT NULL, "address" character varying(60) NOT NULL, "rating" float NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46823ff82e049f53a704e34b65d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5ee6bfb48852f01a7dd1274869" ON "place_entity"  ("ownerId", "rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" text, "passwordHash" text, "roles" json NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`DROP INDEX "IDX_5ee6bfb48852f01a7dd1274869"`);
        await queryRunner.query(`DROP TABLE "place_entity"`);
    }

}
