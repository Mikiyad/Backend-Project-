import { Entity, PrimaryGeneratedColumn, Column,OneToMany, ManyToOne } from "typeorm";
import { Seller } from "./SellerEntity";
import { Buyer } from "./BuyerEntity";
import { OrderItem } from "./OrderItemEntity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id!: number;

    @ManyToOne(() => Seller, seller => seller.orders)
    seller!: Seller;

    @ManyToOne(() => Buyer, buyer => buyer.orders)
    buyer!: Buyer;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items!: OrderItem[];
    
    @Column()
    product_name!: string;

    @Column()
    quantity!: number;

    @Column()
    total_price!: number;
}
// {
//     "seller": {
//       "seller_id": 1 // Replace with a valid seller ID from your Seller table
//     },
//     "buyer": {
//       "buyer_id": 1 // Replace with a valid buyer ID from your Buyer table
//     },
//     "order_items": [
//       {
//         "quantity": 2,
//         "subtotal": 99.98, // Example subtotal for the item
//         "product": {
//           "order_id": 1 // Replace with a valid product ID from your Product table
//         }
//       }
//     ],
//     "product_name": "Wireless Headphones",
//     "quantity": 2,
//     "total_price": 99.98 // Total price for the order
//   }