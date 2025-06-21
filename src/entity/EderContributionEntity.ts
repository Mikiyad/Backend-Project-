import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { EderGroup } from './EderGroupEntity';

@Entity()
export class Contribution extends BaseEntity {
    @PrimaryGeneratedColumn()
    contribution_id!: number;

    @ManyToOne(() => EderGroup, group => group.contributions)
    group!: EderGroup; // FK to EderGroup

    @Column()
    member_name!: string; // Name of the member making the contribution

    @Column()
    amount!: number; // Contribution amount

    @Column()
    contribution_date!: Date; // Date of contribution
}
