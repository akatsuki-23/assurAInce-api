import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectColumnModifications1694767974627 implements MigrationInterface {
    name = 'ProjectColumnModifications1694767974627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "tech_stacks" TO "techStacks"`);
        await queryRunner.query(`CREATE TABLE "employee_projects_project" ("employeeId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_9a8fea6eea92389872050926c21" PRIMARY KEY ("employeeId", "projectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ed82ab979e91a6f1c2d4bcc3ed" ON "employee_projects_project" ("employeeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a41b15c0d25ccbc7086eddbd0" ON "employee_projects_project" ("projectId") `);
        await queryRunner.query(`CREATE TABLE "project_ai_tools_ai_tools" ("projectId" integer NOT NULL, "aiToolsId" integer NOT NULL, CONSTRAINT "PK_550f32f47353ac322fa4737565f" PRIMARY KEY ("projectId", "aiToolsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21b3fef6e24cc93c05d74de8ac" ON "project_ai_tools_ai_tools" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1da3cdfa3878eee6700a17930c" ON "project_ai_tools_ai_tools" ("aiToolsId") `);
        await queryRunner.query(`ALTER TABLE "employee_projects_project" ADD CONSTRAINT "FK_ed82ab979e91a6f1c2d4bcc3ed1" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "employee_projects_project" ADD CONSTRAINT "FK_0a41b15c0d25ccbc7086eddbd0e" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_ai_tools_ai_tools" ADD CONSTRAINT "FK_21b3fef6e24cc93c05d74de8acd" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_ai_tools_ai_tools" ADD CONSTRAINT "FK_1da3cdfa3878eee6700a17930c1" FOREIGN KEY ("aiToolsId") REFERENCES "ai_tools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_ai_tools_ai_tools" DROP CONSTRAINT "FK_1da3cdfa3878eee6700a17930c1"`);
        await queryRunner.query(`ALTER TABLE "project_ai_tools_ai_tools" DROP CONSTRAINT "FK_21b3fef6e24cc93c05d74de8acd"`);
        await queryRunner.query(`ALTER TABLE "employee_projects_project" DROP CONSTRAINT "FK_0a41b15c0d25ccbc7086eddbd0e"`);
        await queryRunner.query(`ALTER TABLE "employee_projects_project" DROP CONSTRAINT "FK_ed82ab979e91a6f1c2d4bcc3ed1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1da3cdfa3878eee6700a17930c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21b3fef6e24cc93c05d74de8ac"`);
        await queryRunner.query(`DROP TABLE "project_ai_tools_ai_tools"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a41b15c0d25ccbc7086eddbd0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed82ab979e91a6f1c2d4bcc3ed"`);
        await queryRunner.query(`DROP TABLE "employee_projects_project"`);
        await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "techStacks" TO "tech_stacks"`);
    }

}
