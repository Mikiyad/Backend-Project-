// src/entity/Escrow.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './UserEntity'; // Assuming you have a User entity

@Entity()
export class Escrow {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('decimal')
    amount!: number; // Amount held in escrow

    @Column('text')
    terms!: string; // Terms of the escrow agreement

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate!: Date; // When the escrow was created

    @ManyToOne(() => User, user => user.escrows)
    buyer!: User; // The buyer in the escrow agreement

    @ManyToOne(() => User, user => user.escrows)
    seller!: User; // The seller in the escrow agreement

   }