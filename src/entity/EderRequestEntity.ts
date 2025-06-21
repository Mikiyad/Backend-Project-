import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { EderGroup } from './EderGroupEntity';

@Entity()
export class EderRequest extends BaseEntity {
    @PrimaryGeneratedColumn()
    request_id!: number;

    @ManyToOne(() => EderGroup, group => group.requests)
    group!: EderGroup; // FK to EderGroup

    @Column()
    requester_name!: string; // Name of the requester

    @Column()
    request_amount!: number; // Amount requested

    @Column()
    request_date!: Date; // Date of the request

    @Column()
    status!: string; // e.g., "pending", "approved", "rejected"
}
