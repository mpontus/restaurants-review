import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1542972994574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" text, "passwordHash" text, "roles" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_73d93da5d7e1af5e2171d9f454" ON "user_entity"  ("createdAt") `);
        await queryRunner.query(`CREATE TABLE "review_entity" ("id" uuid NOT NULL, "rating" float NOT NULL DEFAULT 0, "comment" text NOT NULL, "reply" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "pendingFor" uuid, "placeId" uuid, "authorId" uuid, CONSTRAINT "PK_5a7a10bab252068bd06d10d49e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ce12888af95af29a349162daa" ON "review_entity"  ("placeId", "rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_0b524f9553d0e913dea65c183c" ON "review_entity"  ("placeId", "createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_6829bf7ecdad1b5f6e96f88154" ON "review_entity"  ("pendingFor", "createdAt") `);
        await queryRunner.query(`CREATE TABLE "place_entity" ("id" uuid NOT NULL, "ownerId" uuid NOT NULL, "title" character varying(60) NOT NULL, "address" character varying(60) NOT NULL, "rating" float NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "bestReviewId" uuid, "worstReviewId" uuid, CONSTRAINT "PK_46823ff82e049f53a704e34b65d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_505a558b6c7e2bf7a05a9a4bd0" ON "place_entity"  ("ownerId", "title") `);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590" FOREIGN KEY ("placeId") REFERENCES "place_entity"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_588edac6e2d68fa992769b2876a" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_0a9b0fb7f92dbca2584a021d3f6" FOREIGN KEY ("ownerId") REFERENCES "user_entity"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_41b40e9c7389990009cae5015ff" FOREIGN KEY ("bestReviewId") REFERENCES "review_entity"("id")`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_bd16f2c7c500a3578a45c60722d" FOREIGN KEY ("worstReviewId") REFERENCES "review_entity"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_bd16f2c7c500a3578a45c60722d"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_41b40e9c7389990009cae5015ff"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_0a9b0fb7f92dbca2584a021d3f6"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_588edac6e2d68fa992769b2876a"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590"`);
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`DROP INDEX "IDX_505a558b6c7e2bf7a05a9a4bd0"`);
        await queryRunner.query(`DROP TABLE "place_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_6829bf7ecdad1b5f6e96f88154"`);
        await queryRunner.query(`DROP INDEX "IDX_0b524f9553d0e913dea65c183c"`);
        await queryRunner.query(`DROP INDEX "IDX_8ce12888af95af29a349162daa"`);
        await queryRunner.query(`DROP TABLE "review_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_73d93da5d7e1af5e2171d9f454"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
