import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { ActiveStatus } from 'src/auth/auth-providers.enum';
import { Expose } from 'class-transformer';

@Entity()
export class Employee extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ type: String, nullable: true })
  category?: string | null;

  @Column({ type: String, nullable: true })
  score?: number | null;

  @Column({ type: String, nullable: true })
  reportTo?: string | null;

  @Column({ type: String, nullable: true })
  skillSets?: string[];

  @Column({ type: String, nullable: true })
  domains?: string[];

  @Column({ type: String, nullable: true })
  aiToolProficiency?: number | null;

  @Column({ type: String, nullable: true })
  careerDetails?: string | null;

  @Column({ default: ActiveStatus.active })
  activeStatus: string;

  @Column({ type: String, nullable: true })
  profileUrl?: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
