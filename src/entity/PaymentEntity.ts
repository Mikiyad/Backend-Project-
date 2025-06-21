// src/entity/Payment.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './UserEntity'; // Assuming you have a User entity

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.payments)
    sender!: User; // The user making the payment

    @ManyToOne(() => User, user => user.receivedPayments)
    receiver!: User; // The user receiving the payment

    @Column('decimal')
    amount!: number; // Amount of the payment

    @Column()
    status!: string; // Status of the payment (e.g., 'pending', 'completed', 'failed')

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp!: Date; // When the payment was made
}
//{
  //   "amount": 100.50,
  //   "status": "completed",
  //   "sender": {
  //     "user_id": 1 // Replace with a valid sender user ID from your User table
  //   },
  //   "receiver": {
  //     "user_id": 2 // Replace with a valid receiver user ID from your User table
  //   }
  // }
  