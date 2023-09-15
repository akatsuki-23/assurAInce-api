import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProjectPeople1694757864619 implements MigrationInterface {
    name = 'InitProjectPeople1694757864619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_people" ("id" SERIAL NOT NULL, CONSTRAINT "PK_bae2a1e5b4c295d745f9b081f1c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project_people"`);
    }

}
