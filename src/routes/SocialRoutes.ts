import { SocialController } from "../controllers/SocialController";

import * as express from "express";
// Existing createConnection code...

const router = express.Router();
// Social routes
router.post("/Social", SocialController.createSocial);
router.get("/Social", SocialController.getSocial);
router.put("/Social/:id", SocialController.updateSocial);
router.delete("/Social/:id", SocialController.deleteSocial);

export {router as SocialRoutes};