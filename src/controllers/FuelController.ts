import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FuelListing } from "../entity/FuelEntity";

export class FuelController {
    // Create Fuel
    static async createFuel(req: Request, res: Response) {
        const FuelRepo = getRepository(FuelListing);
        const Fuel = FuelRepo.create(req.body);
        await FuelRepo.save(Fuel);
        return res.status(201).json(Fuel);
    }

    // Get all Fuel 
    static async getFuel(req: Request, res: Response) {
        const FuelRepo = getRepository(FuelListing);
        const fuels = await FuelRepo.find({ relations: ["seller"] }); // change "user" → "seller"
        return res.json(fuels);
    }
    
    // Update Fuel 
    static async updateFuel(req: Request, res: Response) {
        const FuelRepo = getRepository(FuelListing);
        const { id } = req.params;

        const Fuel = await FuelRepo.findOne({ where:{id:Number(req.params.id)}});
        if (!Fuel) {
            return res.status(404).json({ message: "Fuel not found" });
        }

        FuelRepo.merge(Fuel, req.body);
        await FuelRepo.save(Fuel);
        return res.json(Fuel);
    }

    // Delete Fuel Fuel
    static async deleteFuel(req: Request, res: Response) {
        const FuelRepo = getRepository(FuelListing);
        const { id } = req.params;

        const result = await FuelRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Fuel not found" });
        }

        return res.status(204).send();
    }
}