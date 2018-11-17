import {MigrationInterface, QueryRunner} from "typeorm";

export class addPlaceEntity1542475723871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "place_entity" ("id" uuid NOT NULL, "ownerId" character varying NOT NULL, "title" character varying NOT NULL, "address" character varying NOT NULL, "rating" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46823ff82e049f53a704e34b65d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "place_entity"`);
    }

}
