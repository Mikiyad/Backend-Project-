import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Investor } from "../entity/InvestorEntity";
import { Loan } from "../entity/LoanEntity";
import { LoanApplication } from "../entity/LoanApplicationEntity";
import { LoanRepayment } from "../entity/LoanRepaymentEntity";
import { LoanRequirement } from "../entity/LoanRequirementEntity";

export class LoanController {
    // Investor methods
    static async createInvestor(req: Request, res: Response) {
        const investorRepo = getRepository(Investor);
        const investor = investorRepo.create(req.body);
        await investorRepo.save(investor);
        return res.status(201).json(investor);
    }

    static async getInvestors(req: Request, res: Response) {
        const investorRepo = getRepository(Investor);
        const investors = await investorRepo.find({ relations: ["loans"] });
        return res.json(investors);
    }

    static async updateInvestor(req: Request, res: Response) {
        const investorRepo = getRepository(Investor);
        const { id } = req.params;

        const investor = await investorRepo.findOne({where:{investor_id:Number(id)}});
        if (!investor) {
            return res.status(404).json({ message: "Investor not found" });
        }

        investorRepo.merge(investor, req.body);
        await investorRepo.save(investor);
        return res.json(investor);
    }

    static async deleteInvestor(req: Request, res: Response) {
        const investorRepo = getRepository(Investor);
        const { id } = req.params;

        const result = await investorRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Investor not found" });
        }

        return res.status(204).send();
    }

    // Loan methods
    static async createLoan(req: Request, res: Response) {
        const loanRepo = getRepository(Loan);
        const loan = loanRepo.create(req.body);
        await loanRepo.save(loan);
        return res.status(201).json(loan);
    }

    static async getLoans(req: Request, res: Response) {
        const loanRepo = getRepository(Loan);
        const loans = await loanRepo.find({ relations: ["investor"] });
        return res.json(loans);
    }

    static async updateLoan(req: Request, res: Response) {
        const loanRepo = getRepository(Loan);
        const { id } = req.params;

        const loan = await loanRepo.findOne({where:{loan_id:Number(id)}});
        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        loanRepo.merge(loan, req.body);
        await loanRepo.save(loan);
        return res.json(loan);
    }

    static async deleteLoan(req: Request, res: Response) {
        const loanRepo = getRepository(Loan);
        const { id } = req.params;

        const result = await loanRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Loan not found" });
        }

        return res.status(204).send();
    }

    // Loan Application methods
    static async createApplication(req: Request, res: Response) {
        const applicationRepo = getRepository(LoanApplication);
        const application = applicationRepo.create(req.body);
        await applicationRepo.save(application);
        return res.status(201).json(application);
    }

    static async getApplications(req: Request, res: Response) {
        const applicationRepo = getRepository(LoanApplication);
        const applications = await applicationRepo.find({ relations: ["loan"] });
        return res.json(applications);
    }

    static async updateApplication(req: Request, res: Response) {
        const applicationRepo = getRepository(LoanApplication);
        const { id } = req.params;

        const application = await applicationRepo.findOne({where:{application_id:Number(id)}});
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        applicationRepo.merge(application, req.body);
        await applicationRepo.save(application);
        return res.json(application);
    }

    static async deleteApplication(req: Request, res: Response) {
        const applicationRepo = getRepository(LoanApplication);
        const { id } = req.params;

        const result = await applicationRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Application not found" });
        }

        return res.status(204).send();
    }

    // Loan Repayment methods
    static async createRepayment(req: Request, res: Response) {
        const repaymentRepo = getRepository(LoanRepayment);
        const repayment = repaymentRepo.create(req.body);
        await repaymentRepo.save(repayment);
        return res.status(201).json(repayment);
    }

    static async getRepayments(req: Request, res: Response) {
        const repaymentRepo = getRepository(LoanRepayment);
        const repayments = await repaymentRepo.find({ relations: ["loan"] });
        return res.json(repayments);
    }
 
    static async updateRepayment(req: Request, res: Response) {
        try {
            const repaymentRepo = getRepository(LoanRepayment);
            const id = Number(req.params.id);

            // Validate ID
            if (isNaN(id)) {
                return res.status(400).json({ message: "Invalid ID" });
            }

            // Use the correct syntax for findOne
            const repayment = await repaymentRepo.findOne({
                where: { repayment_id: id as any }, // Cast to 'any' to bypass type checking
            });

            // Check if repayment exists
            if (!repayment) {
                return res.status(404).json({ message: "Repayment not found" });
            }

            // Merge updated data
            repaymentRepo.merge(repayment, req.body); // Use req.body to update fields

            // Save updated repayment
            const updatedRepayment = await repaymentRepo.save(repayment);

            return res.status(200).json(updatedRepayment);
        } catch (error:any) {
            console.error("Update failed:", error);
            return res.status(500).json({ message: "Server error", error: error.message });
        }
    }

      
    static async deleteRepayment(req: Request, res: Response) {
        const repaymentRepo = getRepository(LoanRepayment);
        const { id } = req.params;

        const result = await repaymentRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Repayment not found" });
        }

        return res.status(204).send();
    }

    // Loan Requirement methods
    static async createRequirement(req: Request, res: Response) {
        const requirementRepo = getRepository(LoanRequirement);
        const requirement = requirementRepo.create(req.body);
        await requirementRepo.save(requirement);
        return res.status(201).json(requirement);
    }

    static async getRequirements(req: Request, res: Response) {
        const requirementRepo = getRepository(LoanRequirement);
        const requirements = await requirementRepo.find({ relations: ["loan"] });
        return res.json(requirements);
    }

    static async updateRequirement(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const requirementId = Number(id);
            const requirementRepo = getRepository(LoanRequirement);
    
            if (!requirementId) {
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid requirement ID" 
                });
            }
    
            const requirement = await requirementRepo.findOneBy({ 
                requirement_id: requirementId 
            });
    
            if (!requirement) {
                return res.status(404).json({ 
                    success: false,
                    message: "Requirement not found" 
                });
            }
    
            Object.assign(requirement, req.body);
            const updated = await requirementRepo.save(requirement);
    
            return res.json({ 
                success: true,
                data: updated 
            });
    
        } catch (error) {
            console.error("Update requirement error:", error);
            return res.status(500).json({ 
                success: false,
                message: "Failed to update requirement" 
            });
        }
    }
      
    static async deleteRequirement(req: Request, res: Response) {
        const requirementRepo = getRepository(LoanRequirement);
        const { id } = req.params;

        const result = await requirementRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Requirement not found" });
        }

        return res.status(204).send();
    }
}
