// src/entity/LoanRepayment.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Loan } from './LoanEntity';

@Entity()
export class LoanRepayment {
    @PrimaryGeneratedColumn()
    repayment_id!: Loan; // Associated loan

    @Column('decimal')
    amount!: number; // Amount repaid

    @Column('date')
    paymentDate!: Date; // Date of repayment

    @ManyToOne(() => Loan, (loan) => loan.loan_id)
    loan!: Loan; // ✅ this is the relation
}
// {
//     "loan": {
//       "loan_id": 1 // Replace with a valid loan ID from your Loan table
//     },
//     "amount": 1500.00,
//     "paymentDate": "2025-06-13"
//   }