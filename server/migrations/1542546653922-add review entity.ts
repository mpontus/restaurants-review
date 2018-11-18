import {MigrationInterface, QueryRunner} from "typeorm";

export class addReviewEntity1542546653922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "review_entity" ("id" uuid NOT NULL, "rating" float NOT NULL DEFAULT 0, "comment" text NOT NULL, "reply" text, "dateVisitted" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "pendingFor" uuid, "placeId" uuid, "authorId" uuid, CONSTRAINT "PK_5a7a10bab252068bd06d10d49e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0b524f9553d0e913dea65c183c" ON "review_entity"  ("placeId", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_6829bf7ecdad1b5f6e96f88154" ON "review_entity"  ("pendingFor", "createdAt") `);
        await queryRunner.query(`DROP INDEX "IDX_5ee6bfb48852f01a7dd1274869"`);
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" float NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_5ee6bfb48852f01a7dd1274869" ON "place_entity"  ("ownerId", "rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590" FOREIGN KEY ("placeId") REFERENCES "place_entity"("id")`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_588edac6e2d68fa992769b2876a" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_588edac6e2d68fa992769b2876a"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590"`);
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`DROP INDEX "IDX_5ee6bfb48852f01a7dd1274869"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" double precision NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ee6bfb48852f01a7dd1274869" ON "place_entity"  ("ownerId", "rating") `);
        await queryRunner.query(`DROP INDEX "IDX_6829bf7ecdad1b5f6e96f88154"`);
        await queryRunner.query(`DROP INDEX "IDX_0b524f9553d0e913dea65c183c"`);
        await queryRunner.query(`DROP TABLE "review_entity"`);
    }

}
