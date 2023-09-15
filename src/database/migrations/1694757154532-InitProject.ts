import { MigrationInterface, QueryRunner } from "typeorm";

export class InitProject1694757154532 implements MigrationInterface {
    name = 'InitProject1694757154532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "tech_stacks" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "statusId" integer, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dedfea394088ed136ddadeee89" ON "project" ("name") `);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_b6d55aff9b16e061712260da686" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_b6d55aff9b16e061712260da686"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dedfea394088ed136ddadeee89"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
