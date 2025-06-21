import { Entity, PrimaryGeneratedColumn, Column, OneToOne ,OneToMany,JoinColumn, BaseEntity } from "typeorm";
import { Order } from "./OrderEntity";
import { User} from './UserEntity'
@Entity()
export class Seller extends BaseEntity {
    @PrimaryGeneratedColumn()
    seller_id!: number;

    @Column()
    shopName!: string;

    @Column({ nullable: true })
    shopDescription!: string;

    @Column()
    rating!: number;

    @OneToOne(() => User)
    @JoinColumn() // This creates a foreign key in the Seller table
    user!: User;

    @OneToMany(() => Order, order => order.seller)
    orders!: Order[];
}

// {
//     "shopName": "Tech Gadgets",
//     "shopDescription": "Your one-stop shop for the latest tech gadgets.",
//     "rating": 4.5,
//     "user": {
//       "user_id": 1 // Replace with a valid user ID from your User table
//     }
//   }
  