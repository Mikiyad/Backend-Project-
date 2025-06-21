import { MultimediaContentController } from "../controllers/MultiMediaController";

import * as express from "express";
// Existing createConnection code...
const router = express.Router();

// Multimedia Content routes
router.post("/multimedia", MultimediaContentController.createContent);
router.get("/multimedia", MultimediaContentController.getContent);
router.put("/multimedia/:id", MultimediaContentController.updateContent);
router.delete("/multimedia/:id", MultimediaContentController.deleteContent);

export {router as MultiMediaRoutes}