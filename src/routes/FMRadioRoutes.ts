import * as express from "express";
import { FMRadioController } from "../controllers/FMRadioController";

// Existing createConnection code...
const router = express.Router();

// Farming Tip routes
router.post("/fmRadio", FMRadioController.createFMRadio);
router.get("/fmRadio", FMRadioController.getFMRadio);
router.put("/fmRadio/:id", FMRadioController.updateFMRadio);
router.delete("/fmRadio/:id", FMRadioController.deleteFMRadio);

export {router as FmRoutes}