import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude } from 'class-transformer';

@Entity()
export class AiTools extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: false })
  name: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  domain: string;

  // @Exclude({ toPlainOnly: true })
  // public popularity: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: 'float', nullable: true })
  public savingsPerProject: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
