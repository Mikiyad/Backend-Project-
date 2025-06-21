import { EderController } from "../controllers/EderController";

import * as express from "express";
// Existing createConnection code...
const router = express.Router();
// Eder Group routes
router.post("/eder-groups", EderController.createGroup);
router.get("/eder-groups", EderController.getGroups);
router.put("/eder-groups/:id", EderController.updateGroup);
router.delete("/eder-groups/:id", EderController.deleteGroup);

// Contribution routes
router.post("/contributions", EderController.createContribution);
router.get("/contributions", EderController.getContributions);
router.put("/contributions/:id", EderController.updateContribution);
router.delete("/contributions/:id", EderController.deleteContribution);

// Eder Request routes
router.post("/eder-requests", EderController.createRequest);
router.get("/eder-requests", EderController.getRequests);
router.put("/eder-requests/:id", EderController.updateRequest);
router.delete("/eder-requests/:id", EderController.deleteRequest);

export {router as EderRoutes}