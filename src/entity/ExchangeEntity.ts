import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Market } from "./MarketEntity";

@Entity()
export class Exchange extends BaseEntity{
    @PrimaryGeneratedColumn()
    crop_id!: number;

    @ManyToOne(() => Market, market => market.exchanges)
    market!: Market;

}
// {
//     "market": {
//       "market_id": 1 // Replace with a valid market ID from your Market table
//     }
//   }