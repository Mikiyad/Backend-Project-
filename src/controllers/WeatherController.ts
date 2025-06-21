import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Weather } from "../entity/WeatherEntity";

export class WeatherController {
    // Create Weather Forecast
    static async createForecast(req: Request, res: Response) {
        const weatherRepo = getRepository(Weather);
        const weather = weatherRepo.create(req.body);
        await weatherRepo.save(weather);
        return res.status(201).json(weather);
    }

    // Get all Weather Forecasts
    static async getForecasts(req: Request, res: Response) {
        const weatherRepo = getRepository(Weather);
        const forecasts = await weatherRepo.find({ relations: ["user"] });
        return res.json(forecasts);
    }

    // Update Weather Forecast
    static async updateForecast(req: Request, res: Response) {
        try {
            const repo = getRepository(Weather);
            const forecast = await repo.findOneBy({ forecast_id: Number(req.params.id) });
            if (!forecast) return res.status(404).json({ error: "Forecast not found" });
            
            // Basic validation
            if (req.body.temperature && isNaN(req.body.temperature)) {
                return res.status(400).json({ error: "Invalid temperature" });
            }
            
            Object.assign(forecast, req.body);
            return res.json(await repo.save(forecast));
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Update failed" });
        }
    }
    
    // Delete Weather Forecast
    static async deleteForecast(req: Request, res: Response) {
        const weatherRepo = getRepository(Weather);
        const { id } = req.params;

        const result = await weatherRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Forecast not found" });
        }

        return res.status(204).send();
    }
}