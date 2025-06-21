import * as express from "express";
import { FuelController } from "../controllers/FuelController";

// Existing createConnection code...
const router = express.Router();

// Farming Tip routes
router.post("/fuel", FuelController.createFuel);
router.get("/fuel", FuelController.getFuel);
router.put("/fuel/:id", FuelController.updateFuel);
router.delete("/fuel/:id", FuelController.deleteFuel);

export {router as FuelRoutes}