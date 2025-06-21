import { FarmingTipController } from "../controllers/FarmingTipController";
import * as express from "express";
// Existing createConnection code...
const router = express.Router();

// Farming Tip routes
router.post("/farming-tips", FarmingTipController.createTip);
router.get("/farming-tips", FarmingTipController.getTips);
router.put("/farming-tips/:id", FarmingTipController.updateTip);
router.delete("/farming-tips/:id", FarmingTipController.deleteTip);

export {router as FarmRoutes}