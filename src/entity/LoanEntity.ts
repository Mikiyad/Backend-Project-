import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToOne } from "typeorm";
import { LoanApplication } from "./LoanApplicationEntity";
import { Investor } from './InvestorEntity';
@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    loan_id!: number;

    @Column()
    amount!: number;

    @Column()
    interest_rate!: number;
    @ManyToOne(() => Investor, investor => investor.investor_id)
    investor!: Investor; // Associated investor

    @Column('decimal')
    interestRate!: number; // Interest rate

    @Column('date')
    startDate!: Date; // Loan start date

    @Column('date')
    endDate!: Date; // Loan end date

    @Column({ default: 'active' })
    status!: string; // Status of the loan (e.g., active, repaid)

    @OneToMany(() => LoanApplication, loanApplication => loanApplication.application_id)
    loan_applications!: LoanApplication[];
}

 
