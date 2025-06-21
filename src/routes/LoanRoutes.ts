import * as express from "express";
import { LoanController } from "../controllers/LoanControllers";

// Existing createConnection code...
const router = express.Router();

// Investor routes
router.post("/investors", LoanController.createInvestor);
router.get("/investors", LoanController.getInvestors);
router.put("/investors/:id", LoanController.updateInvestor);
router.delete("/investors/:id", LoanController.deleteInvestor);

// Loan routes
router.post("/loans", LoanController.createLoan);
router.get("/loans", LoanController.getLoans);
router.put("/loans/:id", LoanController.updateLoan);
router.delete("/loans/:id", LoanController.deleteLoan);

// Loan routerlication routes
router.post("/loan-applications", LoanController.createApplication);
router.get("/loan-applications", LoanController.getApplications);
router.put("/loan-applications/:id", LoanController.updateApplication);
router.delete("/loan-applications/:id", LoanController.deleteApplication);

// Loan Repayment routes
router.post("/loan-repayments", LoanController.createRepayment);
router.get("/loan-repayments", LoanController.getRepayments);
router.put("/loan-repayments/:id", LoanController.updateRepayment);
router.delete("/loan-repayments/:id", LoanController.deleteRepayment);

// Loan Requirement routes
router.post("/loan-requirements", LoanController.createRequirement);
router.get("/loan-requirements", LoanController.getRequirements);
router.put("/loan-requirements/:id", LoanController.updateRequirement);
router.delete("/loan-requirements/:id", LoanController.deleteRequirement);

export {router as LoanRoutes}