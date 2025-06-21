import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Investor } from "./InvestorEntity";
import { Loan } from "./LoanEntity";

@Entity()
export class LoanApplication {
    @PrimaryGeneratedColumn()
    application_id!: number;

    @ManyToOne(() => Investor, investor => investor.investor_id)
    investor!: Investor;

    @ManyToOne(() => Loan, loan => loan.loan_id)
    loan!: Loan;

    
    @Column('decimal')
    requestedAmount!: number; // Amount requested

    @Column('text')
    purpose!: string; // Purpose of the loan


    @Column()
    status!: string; // e.g., "pending", "approved", "rejected"

    @Column()
    application_date!: Date;
}
// {
//     "investor": {
//       "investor_id": 1 // Replace with a valid investor ID from your Investor table
//     },
//     "loan": {
//       "loan_id": 1 // Replace with a valid loan ID from your Loan table
//     },
//     "requestedAmount": 5000.00,
//     "purpose": "Home Renovation",
//     "status": "pending",
//     "application_date": "2025-06-13"
//   }

   
