import { VoiceController } from "../controllers/VoiceController";

import * as express from "express";
// Existing createConnection code...

const router = express.Router();
// Voice routes
router.post("/voice", VoiceController.createVoice);
router.get("/voice", VoiceController.getVoices);
router.put("/voice/:id", VoiceController.editVoice);
router.delete("/voice/:id", VoiceController.deleteVoice);

export {router as VoiceRoutes};