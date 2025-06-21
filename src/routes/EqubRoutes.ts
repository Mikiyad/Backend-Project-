import { EqubController } from "../controllers/EqubController";

import * as express from "express";
// Existing createConnection code...
const router = express.Router();
// Equb Group routes
router.post("/equb-groups", EqubController.createGroup);
router.get("/equb-groups", EqubController.getGroups);
router.put("/equb-groups/:id", EqubController.updateGroup);
router.delete("/equb-groups/:id", EqubController.deleteGroup);

// Contribution routes
router.post("/contributions", EqubController.createContribution);
router.get("/contributions", EqubController.getContributions);
router.put("/contributions/:id", EqubController.updateContribution);
router.delete("/contributions/:id", EqubController.deleteContribution);

// Payout routes
router.post("/payouts", EqubController.createPayout);
router.get("/payouts", EqubController.getPayouts);
router.put("/payouts/:id", EqubController.updatePayout);
router.delete("/payouts/:id", EqubController.deletePayout);

export {router as EqubRoutes}