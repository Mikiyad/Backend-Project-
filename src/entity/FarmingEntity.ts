import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class FarmingTip extends BaseEntity {
    @PrimaryGeneratedColumn()
    tip_id!: number;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column({ nullable: true })
    author?: string; // Optional author field

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
// {
//     "title": "Crop Rotation Benefits",
//     "content": "Crop rotation can improve soil health and increase yields.",
//     "author": "John Doe"
//   }