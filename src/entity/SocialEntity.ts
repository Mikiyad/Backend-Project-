// src/entity/SocialInteraction.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './UserEntity'; // Assuming a User entity exists

@Entity()
export class SocialInteraction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    interactionType!: string; // Type of interaction (e.g., "friend", "message", "follow")

    @Column()
    interactionDate!: Date; // Date of the interaction

    @ManyToOne(() => User, user => user.user_id, { nullable: true })
    user!: User; // Initiator of the interaction
}
// {
//     "interactionType": "friend",
//     "interactionDate": "2025-06-13T12:00:00Z",
//     "user": {
//       "user_id": 1 // Replace with a valid user ID from your User table
//     },
//     "targetUser": {
//       "user_id": 2 // Replace with a valid target user ID from your User table
//     }
//   }
