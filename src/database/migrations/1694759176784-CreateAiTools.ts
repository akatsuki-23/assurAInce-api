import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAiTools1694759176784 implements MigrationInterface {
  name = 'CreateAiTools1694759176784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ai_tools" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "domain" character varying, "savingsPerProject" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_04fe3deae9135ad8655be3281cd" UNIQUE ("name"), CONSTRAINT "PK_89bd82d253d0be3420956640296" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ai_tools"`);
  }
}
