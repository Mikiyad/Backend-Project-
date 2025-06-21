import { FaithController } from "../controllers/FaithController";

import * as express from "express";
// Existing createConnection code...
const router = express.Router();

// faith Content routes
router.post("/faith", FaithController.createFaith);
router.get("/faith", FaithController.getFaith);
router.put("/faith/:id", FaithController.updateFaith);
router.delete("/faith/:id", FaithController.deleteFaith);

export {router as FaithRoutes}