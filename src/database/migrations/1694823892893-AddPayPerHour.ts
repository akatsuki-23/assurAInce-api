import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPayPerHour1694823892893 implements MigrationInterface {
  name = 'AddPayPerHour1694823892893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" ADD "PayPerHour" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "PayPerHour"`);
  }
}
