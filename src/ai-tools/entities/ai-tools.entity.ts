import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude } from 'class-transformer';
import { Project } from 'src/projects/entities/project.entity';
import { EmployeeAiToolProficiency } from 'src/ai-tools-proficiency/entities/ai-tools-proficiency.entity';

@Entity()
export class AiTools extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: false })
  name: string;

  @Column({ type: String, nullable: true })
  iconUrl: string | null;

  @Column({ nullable: true })
  domain: string;

  // @Exclude({ toPlainOnly: true })
  // public popularity: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'float', nullable: true })
  public savingsPerProject: number | null;

  @ManyToMany(() => Project, (project) => project.aiTools)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => EmployeeAiToolProficiency, (prof) => prof.aiTool)
  employeeAiToolProficiency: EmployeeAiToolProficiency[];
}
