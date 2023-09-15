import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectAdditionalFields1694803583159
  implements MigrationInterface
{
  name = 'AddProjectAdditionalFields1694803583159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" ADD "startDate" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "project" ADD "endDate" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "project" ADD "category" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "iconUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "projectCode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "amountSaved" numeric(10,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "amountSaved"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "projectCode"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "iconUrl"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "endDate"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "startDate"`);
  }
}
