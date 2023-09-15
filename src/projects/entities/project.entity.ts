import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../statuses/entities/status.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { Expose } from 'class-transformer';
import { AiTools } from 'src/ai-tools/entities/ai-tools.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity()
export class Project extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Index()
  @Column({ type: String, unique: true, nullable: false })
  @Expose({ groups: ['me', 'admin'] })
  name: string | null;

  @Column({ type: String, nullable: true })
  description: string | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @Column({ type: String, nullable: false })
  techStacks: string

  @ManyToMany(() => AiTools, aiTool => aiTool.projects)
  @JoinTable()
  aiTools: AiTools[];

  @ManyToMany(() => Employee, employee => employee.projects)
  employees: Employee[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
