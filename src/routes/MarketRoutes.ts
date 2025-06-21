import * as express from "express";
import { MarketController } from "../controllers/MarketController";

const router = express.Router();
// Market routes
router.post("/markets", MarketController.createMarket);
router.get("/markets", MarketController.getMarkets);
router.put("/markets/:id", MarketController.updateMarket);
router.delete("/markets/:id", MarketController.deleteMarket);

// Exchange routes
router.post("/exchanges", MarketController.createExchange);
router.get("/exchanges", MarketController.getExchanges);
router.put("/exchanges/:id", MarketController.updateExchange);
router.delete("/exchanges/:id", MarketController.deleteExchange);

export {router as MarketRoutes}