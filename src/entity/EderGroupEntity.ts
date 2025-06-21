import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Contribution } from './EderContributionEntity';
import { EderRequest } from './EderRequestEntity';

@Entity()
export class EderGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    group_id!: number;

    @Column()
    name!: string;

    @Column()
    total_amount!: number; // Total amount collected

    @Column()
    period!: number; // Duration in weeks or months

    @OneToMany(() => Contribution, contribution => contribution.group)
    contributions!: Contribution[];

    @OneToMany(() => EderRequest, request => request.group)
    requests!: EderRequest[];
}