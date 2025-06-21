
  import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
  import { Exchange } from "./ExchangeEntity";
  
  @Entity()
  export class Market extends BaseEntity{
      @PrimaryGeneratedColumn()
      price_id!: number;

      @Column()
      crop_name!: string;
    
      @Column()
      current_price!: number;

      @Column()
      price_trend!: number;
      
      @Column()
      market_location!: string;
  
      @OneToMany(() => Exchange, exchange => exchange.market)
      exchanges!: Exchange[];
  }
  // {
  //   "crop_name": "Wheat",
  //   "current_price": 200,
  //   "price_trend": 5, // Positive value indicates an increase, negative indicates a decrease
  //   "market_location": "Downtown"
  // }
  
