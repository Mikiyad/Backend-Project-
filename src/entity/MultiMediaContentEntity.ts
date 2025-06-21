import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { FarmingTip } from './FarmingEntity';

@Entity()
export class MultimediaContent extends BaseEntity {
    @PrimaryGeneratedColumn()
    content_id!: number;

    @Column()
    url!: string; // URL of the multimedia content (image, video, etc.)

    @Column()
    type!: string; // e.g., "image", "video"

    @ManyToOne(() => FarmingTip, farmingTip => farmingTip.tip_id, { nullable: true })
    farmingTip?: FarmingTip; // Optional FK to link to a farming tip
}
// {
//     "url": "http://example.com/image.jpg",
//     "type": "image",
//     "farmingTip": {
//       "tip_id": 1 // Replace with a valid farming tip ID from your FarmingTip table
//     }
//   }
  