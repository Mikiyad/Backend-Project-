import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Seller } from "./SellerEntity";
import { Buyer } from "./BuyerEntity";
import {User} from "./UserEntity";
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    product_id!: number;

    @ManyToOne(() => Seller, seller => seller.orders)
    seller!: Seller;

    @ManyToOne(() => Buyer, buyer => buyer.orders)
    buyer!: Buyer;

    @Column()
    product_name!: string;

    @Column()
    quantity!: number;

    @Column()
    total_price!: number;
}

// {
//     "product_name": "Wireless Mouse",
//     "quantity": 2,
//     "total_price": 49.99,
//     "seller": {
//       "seller_id": 1 // Replace with a valid seller ID from your Seller table
//     },
//     "buyer": {
//       "buyer_id": 1 // Replace with a valid buyer ID from your Buyer table
//     }
//   }