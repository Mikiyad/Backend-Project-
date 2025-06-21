import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { NewsItem } from "../entity/NewsEntity";
import { CommunityDiscussion } from "../entity/CommunityEntity";
import { DiscussionMessage } from "../entity/DiscussionEntity";

export class CommunityController {
    // Create News Item
    static async createNewsItem(req: Request, res: Response) {
        const newsRepo = getRepository(NewsItem);
        const newsItem = newsRepo.create(req.body);
        await newsRepo.save(newsItem);
        return res.status(201).json(newsItem);
    }

    // Get all News Items
    static async getNewsItems(req: Request, res: Response) {
        const newsRepo = getRepository(NewsItem);
        
        try {
            const newsItems = await newsRepo.find(); // Fetch all news items
            return res.json(newsItems);
        } catch (error: any) {
            return res.status(500).json({ message: 'Error fetching news items', error: error.message });
        }
    }

    // Update News Item
    static async updateNewsItem(req: Request, res: Response) {
        const newsRepo = getRepository(NewsItem);
        const { id } = req.params;
    
        const newsItem = await newsRepo.findOneBy({ id: Number(id) });
        if (!newsItem) {
            return res.status(404).json({ message: "News Item not found" });
        }
    
        newsRepo.merge(newsItem, req.body);
        await newsRepo.save(newsItem);
        return res.json(newsItem);
    }
    
    // Delete News Item
    static async deleteNewsItem(req: Request, res: Response) {
        const newsRepo = getRepository(NewsItem);
        const { id } = req.params;

        const result = await newsRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "News Item not found" });
        }

        return res.status(204).send();
    }

    // Create Community Discussion
    static async createDiscussion(req: Request, res: Response) {
        const discussionRepo = getRepository(CommunityDiscussion);
        const discussion = discussionRepo.create(req.body);
        await discussionRepo.save(discussion);
        return res.status(201).json(discussion);
    }

    // Get all Community Discussions
    static async getDiscussions(req: Request, res: Response) {
        const discussionRepo = getRepository(CommunityDiscussion);
        const discussions = await discussionRepo.find({ relations: ["messages"] });
        return res.json(discussions);
    }

     // Update Community Discussion
  static async updateDiscussion(req: Request, res: Response) {
    const discussionRepo = getRepository(CommunityDiscussion);
    const { id } = req.params;

    try {
      const discussion = await discussionRepo.findOneBy({ discussion_id: parseInt(id) });

      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }

      discussionRepo.merge(discussion, req.body);
      const updatedDiscussion = await discussionRepo.save(discussion);

      return res.status(200).json(updatedDiscussion);
    } catch (error: any) {
      return res.status(500).json({ message: "Failed to update discussion", error: error.message });
    }
  }

    // Delete Community Discussion
    static async deleteDiscussion(req: Request, res: Response) {
        const discussionRepo = getRepository(CommunityDiscussion);
        const { id } = req.params;

        const result = await discussionRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Discussion not found" });
        }

        return res.status(204).send();
    }

    // Create Discussion Message
    static async createMessage(req: Request, res: Response): Promise<void> {
        try {
          const { discussion_id, sender, content } = req.body;
    
          const discussion = await CommunityDiscussion.findOneBy({ discussion_id });
          if (!discussion) {
            res.status(404).json({ error: 'Discussion not found' });
            return;
          }
    
          const message = DiscussionMessage.create({
            discussion,
            sender,
            content,
          });
    
          await message.save();
          res.status(201).json(message);
        } catch (err) {
          res.status(500).json({ error: 'Failed to create message', details: err });
        }
      }
      static async getMessageById(req: Request, res: Response) {
        const { id } = req.params; // Assuming id is passed in the URL params
        const parsedId = parseInt(id);

        // Validate the message ID
        if (isNaN(parsedId)) {
            return res.status(400).json({ message: "Invalid message ID" });
        }

        try {
            const message = await getRepository(DiscussionMessage).findOne({
                where: { message_id: parsedId }, // Use parsedId for querying
                relations: ['discussion'], // Ensure the discussion relation is included
            });

            if (!message) {
                return res.status(404).json({ message: "Message not found" });
            }

            return res.status(200).json(message);
        } catch (error: any) {
            console.error("Error fetching message:", error);
            return res.status(500).json({
                message: "Failed to fetch message",
                error: error.message,
            });
        }
    }
    // Update Discussion Message
    static async updateMessage(req: Request, res: Response) {
        const messageRepo = getRepository(DiscussionMessage);
        const { id } = req.params;

         try {
        const message = await messageRepo.findOneBy({ message_id: parseInt(id) });

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        messageRepo.merge(message, req.body);
        const updated = await messageRepo.save(message);

        return res.status(200).json(updated);
    } catch (error: any) {
        return res.status(500).json({ message: "Failed to update message", error: error.message });
    }
    }

    // Delete Discussion Message
    static async deleteMessage(req: Request, res: Response) {
        const messageRepo = getRepository(DiscussionMessage);
        const { id } = req.params;

        const result = await messageRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res.status(204).send();
    }
}