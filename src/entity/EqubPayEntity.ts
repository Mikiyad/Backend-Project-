import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { EqubGroup } from './EqubGroupEntity';

@Entity()
export class Payout extends BaseEntity {
    @PrimaryGeneratedColumn()
    payout_id!: number;

    @Column()
    amount!: number; // Payout amount

    @Column()
    payout_date!: Date; // Date of payout

    @Column()
    recipient_name!: string; // Name of the recipient

    @ManyToOne(() => EqubGroup, group => group._id)
    group!: EqubGroup; // FK to EqubGroup

}