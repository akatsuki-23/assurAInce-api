import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class SocialService extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  organizationName: string;

  @Column({ type: String, nullable: true })
  donationURL: string | null;

  @Column({ type: String, nullable: true })
  email: string | null;

  @Column({ type: String, nullable: true })
  phoneNumber: string | null;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Column({ type: 'decimal', nullable: true })
  donationAmount: number | null;

  @Column({ type: String, nullable: true })
  companyURL: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
