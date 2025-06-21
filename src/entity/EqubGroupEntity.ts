import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Contribution } from './EqubContributionEntity';
import {Payout} from './EqubPayEntity';
@Entity()
export class EqubGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    _id!: number;

    @Column()
    name!: string;

    @Column()
    total_amount!: number; // Total amount collected

    @Column()
    period!: number; // Duration in weeks or months

    @OneToMany(() => Contribution, contribution=> contribution.group)
    contribution!: Contribution[];

    @OneToMany(() => Payout, payout => payout.payout_id)
    payout!: Payout[]; // FK to EqubPayOut
}
