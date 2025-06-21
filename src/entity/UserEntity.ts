import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Payment } from './PaymentEntity';
import { Escrow } from './EscrowEntity';
import { Notification } from './NotificationEntity';
import { Message } from './MessageEntity';

enum Role {
  Admin = "admin",
  User = "user",
}

enum Status {
  Active = "active",
  Inactive = "inactive",
  Pending = "pending",
}

@Entity()
export class User extends BaseEntity{
  static findByIdAndUpdate(id: string, body: any) {
      throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @Column({ unique: true, nullable: false })
  @IsEmail({},{ message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "Phone number is required" })
  phone!: string;

  @Column({ nullable: false })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @IsNotEmpty({ message: "Password is required" })
  password!: string;

  @Column({ type: "enum", enum: Role, default: Role.User })
  profile_type!: Role;

  @Column({ type: "enum", enum: Status, default: Status.Active })
  verification_status!: Status;

  @Column({ nullable: true })
  language_preference!: string; 

  @Column({ nullable: true })
  voice_over_enabled!: string; 

  @Column({ 
    unique: true,
    nullable: false,
    default: () => "gen_random_uuid()" // PostgreSQL function
  })
  @IsNotEmpty({ message: "user_id number is required" })
  user_id!: string;

  @Column({
    type: 'varchar',
    default: 'active'
  })
   status!: string;

  @OneToMany(() => Notification, notification => notification.userId)
  notifications!: Notification[]; // Relationship to notifications

  @OneToMany(() => Payment, payment => payment.sender)
  payments!: Payment[]; // Payments made by the user

  @OneToMany(() => Payment, payment => payment.receiver)
  receivedPayments!: Payment[]; // Payments received by the user

  @OneToMany(() => Escrow, escrow => escrow.buyer)
  escrows!: Escrow[]; // Escrows involving the user (as buyer)

  @OneToMany(() => Escrow, escrow => escrow.seller)
  soldEscrows!: Escrow[]; // Escrows involving the user (as seller)
 
  @OneToMany(() => Message, message => message.sender)
  sentMessages!: Message[];

  @OneToMany(() => Message, message => message.receiver)
  receivedMessages!: Message[];
}

