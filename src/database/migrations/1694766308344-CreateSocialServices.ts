import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSocialServices1694766308344 implements MigrationInterface {
  name = 'CreateSocialServices1694766308344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "social_service" ("id" SERIAL NOT NULL, "organizationName" character varying NOT NULL, "donationURL" character varying, "email" character varying, "phoneNumber" character varying, "address" text, "donationAmount" numeric, "companyURL" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_db8ab11af5f7d632e1ae98ad140" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "social_service"`);
  }
}
