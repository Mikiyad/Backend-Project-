import { Entity, PrimaryGeneratedColumn, ManyToOne,OneToMany } from "typeorm";
import { User } from './UserEntity';
import { Loan } from './LoanEntity';

@Entity()
export class Investor {
    @PrimaryGeneratedColumn()
    investor_id!: number;

    @ManyToOne(() => User, user => user.user_id)
    user!: User; // Associated user

    @OneToMany(() => Loan, loan => loan.loan_id)
    loans!: Loan[]; // Loans associated with the investor
}
// {
//     "user": {
//       "user_id": 1 // Replace with a valid user ID from your User table
//     }
//   }