import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Message } from "../entity/MessageEntity";

export class MessageController {
    // Create Message
    static async createMessage(req: Request, res: Response) {
        const messageRepo = getRepository(Message);
        const message = messageRepo.create(req.body);
        await messageRepo.save(message);
        return res.status(201).json(message);
    }

    // Get all Message
    static async getMessage(req: Request, res: Response) {
        const messageRepo = getRepository(Message);
        const message = await messageRepo.find({ relations: ["user"] });
        return res.json(message);
    }

    // Update Weather Forecast
    static async updateMessage(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const repo = getRepository(Message);
    
            // Validate inputs
             if (!req.body?.content) return res.status(400).json({ error: "Content required", code: "EMPTY_CONTENT" });
    
            // Find and update message
            const message = await repo.findOneBy({ message_id: Number(req.params.id) });
            if (!message) return res.status(404).json({ error: "Message not found", code: "NOT_FOUND" });
    
            Object.assign(message, { content: req.body.content });
            const updated = await repo.save(message);
    
            return res.json({ success: true, data: updated });
    
        } catch (error:any) {
            console.error("Update error:", error);
            return res.status(500).json({ 
                error: error.name === 'QueryFailedError' ? "Database error" : "Server error",
                code: error.name === 'QueryFailedError' ? "DB_ERROR" : "SERVER_ERROR"
            });
        }
    }
    // Delete Weather Forecast
    static async deleteMessage(req: Request, res: Response) {
        const messageRepo = getRepository(Message);
        const { id } = req.params;

        const result = await messageRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res.status(204).send();
    }
}