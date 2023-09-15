// student-subject.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { AiTools } from 'src/ai-tools/entities/ai-tools.entity';

@Entity()
export class EmployeeAiToolProficiency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  proficiency: number;

  @ManyToOne(() => AiTools, (aitools) => aitools.employeeAiToolProficiency)
  aiTool: AiTools;

  @ManyToOne(() => Employee, (employee) => employee.employeeAiToolProficiency)
  employee: Employee;
}
