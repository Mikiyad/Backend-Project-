import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EderGroup } from "../entity/EderGroupEntity";
import { Contribution } from "../entity/EderContributionEntity";
import { EderRequest } from "../entity/EderRequestEntity";

export class EderController {
    // Create Eder Group
    static async createGroup(req: Request, res: Response) {
        const groupRepo = getRepository(EderGroup);
        const group = groupRepo.create(req.body);
        await groupRepo.save(group);
        return res.status(201).json(group);
    }

    // Get all Eder Groups
    static async getGroups(req: Request, res: Response) {
        const groupRepo = getRepository(EderGroup);
        const groups = await groupRepo.find({ relations: ["contributions", "requests"] });
        return res.json(groups);
    }

    // Update Eder Group
    static async updateGroup(req: Request, res: Response) {
        const groupRepo = getRepository(EderGroup);
        const { id } = req.params;

        const group = await groupRepo.findOne({where:{group_id:Number(id)}});
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        groupRepo.merge(group, req.body);
        await groupRepo.save(group);
        return res.json(group);
    }

    // Delete Eder Group
    static async deleteGroup(req: Request, res: Response) {
        const groupRepo = getRepository(EderGroup);
        const { id } = req.params;

        const result = await groupRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Group not found" });
        }

        return res.status(204).send();
    }

    // Create Contribution Eder
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

        const contribution = await contributionRepo.findOne({where:{contribution_id:Number(id)}});
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

    // Create Eder Request
    static async createRequest(req: Request, res: Response) {
        const requestRepo = getRepository(EderRequest);
        const request = requestRepo.create(req.body);
        await requestRepo.save(request);
        return res.status(201).json(request);
    }

    // Get all Eder Requests
    static async getRequests(req: Request, res: Response) {
        const requestRepo = getRepository(EderRequest);
        const requests = await requestRepo.find({ relations: ["group"] });
        return res.json(requests);
    }

    // Update Eder Request
    static async updateRequest(req: Request, res: Response) {
        const requestRepo = getRepository(EderRequest);
        const { id } = req.params;

        const request = await requestRepo.findOne({where:{request_id:Number(id)}});
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        requestRepo.merge(request, req.body);
        await requestRepo.save(request);
        return res.json(request);
    }

    // Delete Eder Request
    static async deleteRequest(req: Request, res: Response) {
        const requestRepo = getRepository(EderRequest);
        const { id } = req.params;

        const result = await requestRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Request not found" });
        }

        return res.status(204).send();
    }
}