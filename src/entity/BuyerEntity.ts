import { Entity, PrimaryGeneratedColumn, Column, OneToMany,OneToOne,JoinColumn, BaseEntity } from "typeorm";
import { Order } from "./OrderEntity";
import {User} from "./UserEntity";
@Entity()
export class Buyer  extends BaseEntity{
    @PrimaryGeneratedColumn()
    buyer_id!: number;
    
    @Column({ nullable: true })
    preferences!: string;

    @Column({ nullable: true })
    paymentMethod!: string;

    @OneToOne(() => User)
    @JoinColumn() // This creates a foreign key in the Buyer table
    user!: User;

    @OneToMany(() => Order, order => order.buyer)
    orders!: Order[];
}