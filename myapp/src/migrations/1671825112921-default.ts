import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671825112921 implements MigrationInterface {
    name = 'default1671825112921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stores" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_7aa6e7d71fa7acdd7ca43d7c9cb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stores"`);
    }

}
