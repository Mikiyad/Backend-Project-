import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FMRadio } from "../entity/FMRadioEntity";

export class FMRadioController {
    // Create FMRadio
    static async createFMRadio(req: Request, res: Response) {
        const FMRadioRepo = getRepository(FMRadio);
        const fmRadio = FMRadioRepo.create(req.body);
        await FMRadioRepo.save(fmRadio);
        return res.status(201).json(fmRadio);
    }

    // Get all FMRadio 
    static async getFMRadio(req: Request, res: Response) {
        const FMRadioRepo = getRepository(FMRadio);
        const fmRadio = await FMRadioRepo.find();
        return res.json(FMRadio);
    }

    // Update FMRadio 
    static async updateFMRadio(req: Request, res: Response) {
        const FMRadioRepo = getRepository(FMRadio);
        const { id } = req.params;

        const fmRadio = await FMRadioRepo.findOne({ where:{id:Number(req.params.id)}});
        if (!fmRadio) {
            return res.status(404).json({ message: "FMRadio not found" });
        }

        FMRadioRepo.merge(fmRadio, req.body);
        await FMRadioRepo.save(fmRadio);
        return res.json(fmRadio);
    }

    // Delete FMRadio FMRadio
    static async deleteFMRadio(req: Request, res: Response) {
        const FMRadioRepo = getRepository(FMRadio);
        const { id } = req.params;

        const result = await FMRadioRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "FMRadio not found" });
        }

        return res.status(204).send();
    }
}