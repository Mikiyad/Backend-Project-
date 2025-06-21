import * as express from "express";
import { CommunityController } from "../controllers/CommunityController";


const router = express.Router();
// News Item routes
router.post("/news-items", CommunityController.createNewsItem);
router.get("/news-items", CommunityController.getNewsItems);
router.put("/news-items/:id", CommunityController.updateNewsItem);
router.delete("/news-items/:id", CommunityController.deleteNewsItem);

//Community Discussion routes
router.post("/community", CommunityController.createDiscussion);
router.get("/community", CommunityController.getDiscussions);
router.put("/community/:id", CommunityController.updateDiscussion);
router.delete("/community/:id", CommunityController.deleteDiscussion);

// // Discussion Message routes
router.post("/discussion", CommunityController.createMessage);
router.get("/discussion/:id", CommunityController.getMessageById);
router.put("/discussion/:id", CommunityController.updateMessage);
router.delete("/discussion/:id", CommunityController.deleteMessage);

export {router as CommunityRoutes};