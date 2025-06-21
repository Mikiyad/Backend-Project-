import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './UserEntity';
@Entity()
export class Weather extends BaseEntity{

      @PrimaryGeneratedColumn()
      forecast_id!: number;
  
      @Column()
      location!: string;
  
      @Column()
      forecast_details!: string;
  
      @Column()
      alert_type!: string; // e.g., "storm", "flood", etc.
  
      
      @Column()
      temperature!: number; // Temperature in Celsius or Fahrenheit

      @Column()
      condition!: string; // Weather condition (e.g., Sunny, Rainy)

      @Column({ nullable: true })
      humidity!: number; // Humidity percentage

      @ManyToOne(() => User, user => user.user_id, { nullable: true })
      user!: User; // Optional FK to link to a user or seller
     }
    //  {
    //   "location": "New York",
    //   "forecast_details": "Heavy rain expected with thunderstorms.",
    //   "alert_type": "storm",
    //   "temperature": 22,
    //   "condition": "Rainy",
    //   "humidity": 85,
    //   "user": {
    //     "user_id": 1 // Replace with a valid user ID from your User table
    //   }
    // }

