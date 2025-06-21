import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Loan } from './LoanEntity';

@Entity()
export class LoanRequirement extends BaseEntity {
    @PrimaryGeneratedColumn()
    requirement_id!: number;

    @ManyToOne(() => Loan, loan => loan.loan_id)
    loan!: Loan;

    @Column()
    requirement_details!: string; // e.g., "Proof of income", "Credit report"
}
// {
//     "loan": {
//       "loan_id": 1 // Replace with a valid loan ID from your Loan table
//     },
//     "requirement_details": "Proof of income"
//   }