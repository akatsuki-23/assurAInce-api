import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployee1694760488750 implements MigrationInterface {
  name = 'CreateEmployee1694760488750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" SERIAL NOT NULL, "email" character varying, "category" character varying, "score" character varying, "reportTo" character varying, "skillSets" character varying, "domains" character varying, "aiToolProficiency" character varying, "careerDetails" character varying, "activeStatus" character varying NOT NULL DEFAULT 'active', "profileUrl" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b304fdea1e7004a4bbf106f97d" ON "employee" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c7f3c521e99f5668d2af7e77ea" ON "employee" ("lastName") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c7f3c521e99f5668d2af7e77ea"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b304fdea1e7004a4bbf106f97d"`,
    );
    await queryRunner.query(`DROP TABLE "employee"`);
  }
}
