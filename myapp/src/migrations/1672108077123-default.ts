import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672108077123 implements MigrationInterface {
    name = 'default1672108077123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_782da5e50e94b763eb63225d69d"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "storeId" TO "store_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_68863607048a1abd43772b314ef" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_68863607048a1abd43772b314ef"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "store_id" TO "storeId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_782da5e50e94b763eb63225d69d" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
