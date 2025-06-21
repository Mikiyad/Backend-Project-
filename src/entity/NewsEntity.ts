// src/entity/News.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './UserEntity'; // Assuming you want to link it to a user

@Entity()
export class NewsItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string; // Title of the news article

    @Column('text')
    content!: string; // Content of the news article

    @Column({ type: 'date' })
    publicationDate!: Date; // Date of publication

    @ManyToOne(() => User, user => user.user_id, { nullable: true })
    author!: User; // Optional FK to link to a user
}
// {
//     "title": "Breaking News: New Technology Emerges",
//     "content": "A revolutionary new technology has been unveiled at the tech expo.",
//     "publicationDate": "2025-06-13",
//     "author": {
//       "user_id": 1 // Replace with a valid user ID from your User table
//     }
//   }