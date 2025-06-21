// src/entity/FuelListing.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './UserEntity'; // Assuming you want to link it to a user or seller

@Entity()
export class FuelListing {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fuelType!: string; // Type of fuel (e.g., Petrol, Diesel)

    @Column('decimal')
    pricePerLiter!: number; // Price per liter of fuel

    @Column()
    location!: string; // Location of the fuel listing

    @Column({ type: 'date' })
    listingDate!: Date; // Date the listing was created

    @ManyToOne(() => User, user => user.user_id, { nullable: true })
    seller!: User; // Optional FK to link to a user or seller
}
// {
//     "fuelType": "Petrol",
//     "pricePerLiter": 1.20,
//     "location": "Downtown Station",
//     "listingDate": "2025-06-14",
//     "seller": {
//       "id": 1 // Replace with a valid user ID from your User table
//     }
//   }