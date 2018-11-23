import {MigrationInterface, QueryRunner} from "typeorm";

export class implementCascadeDeletion1542562940495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_588edac6e2d68fa992769b2876a"`);
        await queryRunner.query(`DROP INDEX "IDX_5ee6bfb48852f01a7dd1274869"`);
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" float NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD "rating" float NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_5ee6bfb48852f01a7dd1274869" ON "place_entity"  ("ownerId", "rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD CONSTRAINT "FK_0a9b0fb7f92dbca2584a021d3f6" FOREIGN KEY ("ownerId") REFERENCES "user_entity"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590" FOREIGN KEY ("placeId") REFERENCES "place_entity"("id") ON DELETE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_588edac6e2d68fa992769b2876a" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_588edac6e2d68fa992769b2876a"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590"`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP CONSTRAINT "FK_0a9b0fb7f92dbca2584a021d3f6"`);
        await queryRunner.query(`DROP INDEX "IDX_876ab22fdbfd114d9f7dd222a5"`);
        await queryRunner.query(`DROP INDEX "IDX_5ee6bfb48852f01a7dd1274869"`);
        await queryRunner.query(`ALTER TABLE "review_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD "rating" double precision NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "place_entity" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "place_entity" ADD "rating" double precision NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE INDEX "IDX_876ab22fdbfd114d9f7dd222a5" ON "place_entity"  ("rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ee6bfb48852f01a7dd1274869" ON "place_entity"  ("ownerId", "rating") `);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_588edac6e2d68fa992769b2876a" FOREIGN KEY ("authorId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review_entity" ADD CONSTRAINT "FK_3d0754e67e40bd7f48a4723e590" FOREIGN KEY ("placeId") REFERENCES "place_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
