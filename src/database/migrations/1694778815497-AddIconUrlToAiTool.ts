import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIconUrlToAiTool1694778815497 implements MigrationInterface {
  name = 'AddIconUrlToAiTool1694778815497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ai_tools" ADD "iconUrl" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ai_tools" DROP COLUMN "iconUrl"`);
  }
}
