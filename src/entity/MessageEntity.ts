// src/entity/Message.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './UserEntity'; // Assuming you have a User entity

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id!: number;

    @ManyToOne(() => User, user => user.sentMessages)
    sender!: User; // The user who sends the message

    @ManyToOne(() => User, user => user.receivedMessages)
    receiver!: User; // The user who receives the message

    @Column('text')
    content!: string; // The content of the message

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date; // When the message was sent
}

// {
//     "sender": {
//       "user_id": 1 // Replace with a valid sender user ID from your User table
//     },
//     "receiver": {
//       "user_id": 2 // Replace with a valid receiver user ID from your User table
//     },
//     "content": "Hello! How are you?",
//     "timestamp": "2025-06-13T12:00:00Z" // Optional, will default to current timestamp
//   }