import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { MultimediaContent } from "../entity/MultiMediaContentEntity";

export class MultimediaContentController {
    static async createContent(req: Request, res: Response) {
        const contentRepo = getRepository(MultimediaContent);
        const content = contentRepo.create(req.body);
        await contentRepo.save(content);
        return res.status(201).json(content);
    }

    static async getContent(req: Request, res: Response) {
        const contentRepo = getRepository(MultimediaContent);
        const contents = await contentRepo.find();
        return res.json(contents);
    }

    static async updateContent(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const contentRepo = getRepository(MultimediaContent);
    
            // Validate ID parameter
            const contentId = Number(id);
            if (isNaN(contentId) || contentId <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid content ID format"
                });
            }
    
            // Find existing content
            const content = await contentRepo.findOne({ 
                where: { content_id: contentId } 
            });
    
            if (!content) {
                return res.status(404).json({
                    success: false,
                    message: "Content not found"
                });
            }
    
            // Validate request body
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No update data provided"
                });
            }
    
            // Protect immutable fields
            const protectedFields = ['content_id', 'created_at', 'user_id'];
            const invalidUpdates = Object.keys(req.body).filter(field => 
                protectedFields.includes(field)
            );
            
            if (invalidUpdates.length > 0) {
                return res.status(403).json({
                    success: false,
                    message: `Cannot update protected fields: ${invalidUpdates.join(', ')}`
                });
            }
    
            // Apply updates
            Object.assign(content, req.body);
            const updatedContent = await contentRepo.save(content);
    
            return res.status(200).json({
                success: true,
                data: updatedContent,
                message: "Content updated successfully"
            });
    
        } catch (error:any) {
            console.error('[ContentController] Update error:', error);
    
            return res.status(500).json({
                success: false,
                message: "An error occurred while updating content",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
    static async deleteContent(req: Request, res: Response) {
        const contentRepo = getRepository(MultimediaContent);
        const { id } = req.params;

        const result = await contentRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Content not found" });
        }

        return res.status(204).send();
    }
}