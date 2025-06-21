import { MessageController } from "../controllers/MessageController";

import * as express from "express";
// Existing createConnection code...

const router = express.Router();
// Weather routes
router.post("/message", MessageController.createMessage);
router.get("/message", MessageController.getMessage);
router.put("/message/:id", MessageController.updateMessage);
router.delete("/message/:id", MessageController.deleteMessage);

export {router as MessageRoutes};