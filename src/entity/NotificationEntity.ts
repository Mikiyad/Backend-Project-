// notification.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, BaseEntity } from 'typeorm';
 
@Entity()
export class Notification extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  message!: string;
  
  @Column({default:false})
  read!:boolean;

  @Column({ name: 'user_id' })
  userId!: string; 
   
  @Column()
  type!: string; // Type of notification (e.g., 'alert', 'info', 'warning')

  @Column({name:'onClick'})
  onClick!:string;
}
// {
//   "title": "New Message Alert",
//   "message": "You have received a new message from John Doe.",
//   "read": false,
//   "userId": "1", // Replace with a valid user ID from your User table
//   "type": "alert",
//   "onClick": "/messages/1" // URL to navigate when the notification is clicked
// }