import { WeatherController } from "../controllers/WeatherController";

import * as express from "express";
// Existing createConnection code...

const router = express.Router();
// Weather routes
router.post("/weather", WeatherController.createForecast);
router.get("/weather", WeatherController.getForecasts);
router.put("/weather/:id", WeatherController.updateForecast);
router.delete("/weather/:id", WeatherController.deleteForecast);

export {router as WeatherRoutes};