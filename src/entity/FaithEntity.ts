// src/entity/FaithRelatedContent.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './UserEntity'; // Assuming you want to link it to a user or author

@Entity()
export class FaithRelatedContent {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string; // Title of the content

    @Column('text')
    content!: string; // Main content or body

    @Column({ type: 'date' })
    publicationDate!: Date; // Date the content was published

    @ManyToOne(() => User, user => user.user_id, { nullable: true })
    user!: User; // Optional FK to link to a user or author
}
// {
//     "title": "Understanding Faith in Daily Life",
//     "content": "Faith can guide our decisions and provide comfort in difficult times.",
//     "publicationDate": "2025-06-14",
//     "author": {
//       "id": 1 // Replace with a valid user ID from your User table
//     }
//   }