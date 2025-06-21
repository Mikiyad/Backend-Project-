import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EqubGroup } from "../entity/EqubGroupEntity";
import { Contribution } from "../entity/EqubContributionEntity";
import { Payout } from "../entity/EqubPayEntity";

export class EqubController {
    // Create Equb Group
    static async createGroup(req: Request, res: Response) {
        const groupRepo = getRepository(EqubGroup);
        const group = groupRepo.create(req.body);
        await groupRepo.save(group);
        return res.status(201).json(group);
    }

    // Get all Equb Groups
    static async getGroups(req: Request, res: Response) {
        const groupRepo = getRepository(EqubGroup);
        const groups = await groupRepo.find({ relations: ["contribution"] });
        return res.json(groups);
    }

    // Update Equb Group
    static async updateGroup(req: Request, res: Response) {
        const groupRepo = getRepository(EqubGroup);
        const { id } = req.params;

        const group = await groupRepo.findOne({where:{_id:Number(id)}});
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        groupRepo.merge(group, req.body);
        await groupRepo.save(group);
        return res.json(group);
    }

    // Delete Equb Group
    static async deleteGroup(req: Request, res: Response) {
        const groupRepo = getRepository(EqubGroup);
        const { id } = req.params;

        const result = await groupRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Group not found" });
        }

        return res.status(204).send();
    }

    // Create Contribution
    static async createContribution(req: Request, res: Response) {
        const contributionRepo = getRepository(Contribution);
        const contribution = contributionRepo.create(req.body);
        await contributionRepo.save(contribution);
        return res.status(201).json(contribution);
    }

    // Get all Contributions
    static async getContributions(req: Request, res: Response) {
        const contributionRepo = getRepository(Contribution);
        const contributions = await contributionRepo.find({ relations: ["group"] });
        return res.json(contributions);
    }

    // Update Contribution
    static async updateContribution(req: Request, res: Response) {
        const contributionRepo = getRepository(Contribution);
        const { id } = req.params;

        const contribution = await contributionRepo.findOne({where:{id:Number(id)}});
        if (!contribution) {
            return res.status(404).json({ message: "Contribution not found" });
        }

        contributionRepo.merge(contribution, req.body);
        await contributionRepo.save(contribution);
        return res.json(contribution);
    }

    // Delete Contribution
    static async deleteContribution(req: Request, res: Response) {
        const contributionRepo = getRepository(Contribution);
        const { id } = req.params;

        const result = await contributionRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Contribution not found" });
        }

        return res.status(204).send();
    }

    // Create Payout
    static async createPayout(req: Request, res: Response) {
        const payoutRepo = getRepository(Payout);
        const payout = payoutRepo.create(req.body);
        await payoutRepo.save(payout);
        return res.status(201).json(payout);
    }

    // Get all Payouts
    static async getPayouts(req: Request, res: Response) {
        const payoutRepo = getRepository(Payout);
        const payouts = await payoutRepo.find({ relations: ["group"] });
        return res.json(payouts);
    }

    // Update Payout
    static async updatePayout(req: Request, res: Response) {
        const payoutRepo = getRepository(Payout);
        const { id } = req.params;

        const payout = await payoutRepo.findOne({where:{payout_id:Number(id)}});
        if (!payout) {
            return res.status(404).json({ message: "Payout not found" });
        }

        payoutRepo.merge(payout, req.body);
        await payoutRepo.save(payout);
        return res.json(payout);
    }

    // Delete Payout
    static async deletePayout(req: Request, res: Response) {
        const payoutRepo = getRepository(Payout);
        const { id } = req.params;

        const result = await payoutRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Payout not found" });
        }

        return res.status(204).send();
    }
}
