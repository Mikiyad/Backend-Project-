import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { SocialInteraction } from "../entity/SocialEntity";

export class SocialController {
    // Create social
    static async createSocial(req: Request, res: Response) {
        const socialRepo = getRepository(SocialInteraction);
        const social = socialRepo.create(req.body);
        await socialRepo.save(social);
        return res.status(201).json(social);
    }

    // Get all social 
    static async getSocial(req: Request, res: Response) {
        const socialRepo = getRepository(SocialInteraction);
        const social = await socialRepo.find({ relations: ["user"] });
        return res.json(social);
    }

    // Update social 
    static async updateSocial(req: Request, res: Response) {
        const socialRepo = getRepository(SocialInteraction);
        const { id } = req.params;

        const social = await socialRepo.findOne({ where: { id: parseInt(id) } })
        if (!social) {
            return res.status(404).json({ message: "social not found" });
        }

        socialRepo.merge(social, req.body);
        await socialRepo.save(social);
        return res.json(social);
    }

    // Delete social 
    static async deleteSocial(req: Request, res: Response) {
        const socialRepo = getRepository(SocialInteraction);
        const { id } = req.params;

        const result = await socialRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "social not found" });
        }

        return res.status(204).send();
    }
}