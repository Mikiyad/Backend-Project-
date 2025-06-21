import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import {EqubGroup} from './EqubGroupEntity';
@Entity()
export class Contribution extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    member_name!: string; // Name of the member making the contribution

    @Column()
    amount!: number; // Contribution amount

    @Column()
    contribution_date!: Date; // Date of contribution

    @ManyToOne(() => EqubGroup, group => group.contribution)
    group!: EqubGroup[];
}