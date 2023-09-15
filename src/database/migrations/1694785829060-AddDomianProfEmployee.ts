import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDomianProfEmployee1694785829060 implements MigrationInterface {
  name = 'AddDomianProfEmployee1694785829060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" ADD "domainProficiency" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee" DROP COLUMN "domainProficiency"`,
    );
  }
}
