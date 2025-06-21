import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./OrderEntity";
import { Product } from "./ProductEntity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    order_item_id!: number;

    @ManyToOne(() => Order, order => order.order_id)
    order!: Order;

    @ManyToOne(() => Product, product => product.product_id)
    product!: Product;

    @Column()
    quantity!: number;

    @Column()
    subtotal!: number; // price * quantity
}
// {
//     "quantity": 3,
//     "subtotal": 149.97, // Example: price of the product is $49.99
//     "order": {
//       "order_id": 1 // Replace with a valid order ID from your Order table
//     },
//     "product": {
//       "order_id": 1 // Replace with a valid product ID from your Product table
//     }
//   }