import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeeAiToolProficiency1694768324288
  implements MigrationInterface
{
  name = 'CreateEmployeeAiToolProficiency1694768324288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee_ai_tool_proficiency" ("id" SERIAL NOT NULL, "proficiency" integer NOT NULL, "aiToolId" integer, "employeeId" integer, CONSTRAINT "PK_2c6412ac8fa2c09a23e08e8045d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_ai_tool_proficiency" ADD CONSTRAINT "FK_e286eeac6a51ae803a2ca782a5e" FOREIGN KEY ("aiToolId") REFERENCES "ai_tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_ai_tool_proficiency" ADD CONSTRAINT "FK_7225307ee8f27e144a7e97082de" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employee_ai_tool_proficiency" DROP CONSTRAINT "FK_7225307ee8f27e144a7e97082de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "employee_ai_tool_proficiency" DROP CONSTRAINT "FK_e286eeac6a51ae803a2ca782a5e"`,
    );
    await queryRunner.query(`DROP TABLE "employee_ai_tool_proficiency"`);
  }
}
