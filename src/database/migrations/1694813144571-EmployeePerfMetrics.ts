import { MigrationInterface, QueryRunner } from "typeorm";

export class EmployeePerfMetrics1694813144571 implements MigrationInterface {
    name = 'EmployeePerfMetrics1694813144571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "empEnvironmentSatisfaction" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "EmpLastSalaryHikePercent" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "EmpWorkLifeBalance" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "ExperienceYearsAtThisCompany" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "ExperienceYearsInCurrentRole" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "YearsSinceLastPromotion" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "YearsWithCurrManager" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "YearsWithCurrManager"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "YearsSinceLastPromotion"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "ExperienceYearsInCurrentRole"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "ExperienceYearsAtThisCompany"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "EmpWorkLifeBalance"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "EmpLastSalaryHikePercent"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "empEnvironmentSatisfaction"`);
    }

}
