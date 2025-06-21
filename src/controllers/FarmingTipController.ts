import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { FarmingTip } from "../entity/FarmingEntity";

export class FarmingTipController {
    static async createTip(req: Request, res: Response) {
        const tipRepo = getRepository(FarmingTip);
        const tip = tipRepo.create(req.body);
        await tipRepo.save(tip);
        return res.status(201).json(tip);
    }

    static async getTips(req: Request, res: Response) {
        const tipRepo = getRepository(FarmingTip);
        const tips = await tipRepo.find();
        return res.json(tips);
    }

    static async updateTip(req: Request, res: Response) {
        const tipRepo = getRepository(FarmingTip);
        const { id } = req.params;

        const tip = await tipRepo.findOne({where:{tip_id:Number(id)}});
        if (!tip) {
            return res.status(404).json({ message: "Tip not found" });
        }

        tipRepo.merge(tip, req.body);
        await tipRepo.save(tip);
        return res.json(tip);
    }

    static async deleteTip(req: Request, res: Response) {
        const tipRepo = getRepository(FarmingTip);
        const { id } = req.params;

        const result = await tipRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Tip not found" });
        }

        return res.status(204).send();
    }
}
