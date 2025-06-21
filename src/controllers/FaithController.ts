import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FaithRelatedContent } from "../entity/FaithEntity";

export class FaithController {
    // Create faith
    static async createFaith(req: Request, res: Response) {
        const faithRepo = getRepository(FaithRelatedContent);
        const faith = faithRepo.create(req.body);
        await faithRepo.save(faith);
        return res.status(201).json(faith);
    }

    // Get all faith 
    static async getFaith(req: Request, res: Response) {
        const faithRepo = getRepository(FaithRelatedContent);
        const faith = await faithRepo.find({ relations: ["user"] });
        return res.json(faith);
    }

    // Update faith 
    static async updateFaith(req: Request, res: Response) {
        const faithRepo = getRepository(FaithRelatedContent);
        const { id } = req.params;

        const faith = await faithRepo.findOne({ where:{id:Number(req.params.id)}});
        if (!faith) {
            return res.status(404).json({ message: "faith not found" });
        }

        faithRepo.merge(faith, req.body);
        await faithRepo.save(faith);
        return res.json(faith);
    }

    // Delete faith faith
    static async deleteFaith(req: Request, res: Response) {
        const faithRepo = getRepository(FaithRelatedContent);
        const { id } = req.params;

        const result = await faithRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "faith not found" });
        }

        return res.status(204).send();
    }
}