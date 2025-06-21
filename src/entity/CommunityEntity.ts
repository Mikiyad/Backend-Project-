import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { DiscussionMessage } from './DiscussionEntity';

@Entity()
export class CommunityDiscussion extends BaseEntity {
    @PrimaryGeneratedColumn()
    discussion_id!: number;

    @Column({ nullable: true })
    title!: string;

    @Column({ nullable: true })
    created_by!: string; // Name of the creator

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @OneToMany(() => DiscussionMessage, message => message.message_id, { nullable: false })
    messages!: DiscussionMessage[];
}