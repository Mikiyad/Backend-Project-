import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { CommunityDiscussion } from './CommunityEntity';

@Entity()
export class DiscussionMessage extends BaseEntity {
    @PrimaryGeneratedColumn()
    message_id!: number;

    @ManyToOne(() => CommunityDiscussion, discussion => discussion.discussion_id, { nullable: false })
    discussion!: CommunityDiscussion; // FK to CommunityDiscussion

    @Column({ nullable: true })
    sender!: string; // Name of the sender

    @Column({ nullable: true })
    content!: string; // Message content

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    sent_at!: Date;
}
