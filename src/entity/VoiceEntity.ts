// src/entity/VoiceOverContent.ts
import { Entity, PrimaryGeneratedColumn, Column,ManyToOne } from 'typeorm';
import {User} from './UserEntity'
@Entity()
export class VoiceOverContent {
    @PrimaryGeneratedColumn()
    voice_id!: number; // Unique identifier for the content

    @Column('text')
    audio_url!: string; // The text content to be converted to speech

    @Column({ nullable: true })
    language!: string; // Language code (e.g., 'en-US', 'es-ES')

    @Column({default:true})
    offline_availability!:boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate!: Date; // When the content was created

    @Column({ default: false })
    isActivation_keyword!: boolean; // Indicates if the content is active or not
   
    @ManyToOne(() => User, user => user.user_id)
    user!: User; // The user who recorded the voice message

    @Column()
    filePath!: string; // Path to the voice recording file

    @Column('time')
    duration!: string; // Duration of the recording (HH:MM:SS)

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date; // When the recording was made
}
// {
//     "audio_url": "http://example.com/audio/voice_message.mp3",
//     "language": "en-US",
//     "offline_availability": true,
//     "isActivation_keyword": false,
//     "filePath": "/path/to/voice_message.mp3",
//     "duration": "00:02:30",
//     "user": {
//       "user_id": 1 // Replace with a valid user ID from your User table
//     }
//   }