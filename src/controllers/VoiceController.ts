import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { VoiceOverContent } from "../entity/VoiceEntity";

export class VoiceController {
    // Create Voice
    static async createVoice(req: Request, res: Response) {
        const voiceRepo = getRepository(VoiceOverContent);
        const voice = voiceRepo.create(req.body);
        await voiceRepo.save(voice);
        return res.status(201).json(voice);
    }

    // Get all  Voices
    static async getVoices(req: Request, res: Response) {
        const voiceRepo = getRepository(VoiceOverContent);
        const voice = await voiceRepo.find({ relations: ["user"] });
        return res.json(voice);
    }

//     // Update  Voice
//     static async updateVoice(req: Request, res: Response) {
//     try {
//         const repo = getRepository(VoiceOverContent);
//         const voice = await repo.findOne({where:{ voice_id: Number(req.params.id) }});
//         if (!voice) return res.status(404).json({ error: "Voice not found" });
        
//         // // Basic validation
//         // if (req.body.duration && isNaN(req.body.duration)) {
//         //     return res.status(400).json({ error: "Invalid duration" });
//         // }
        
//         // Object.assign(voice, req.body);
//         return res.json(await repo.save(voice));
        
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Update failed" });
//     }
// }

    static async  editVoice(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const voiceRepo=getRepository(VoiceOverContent)
    // Update the product by its ID
    const voiceValue = await voiceRepo.findOne({ where: { voice_id: parseInt(id) } });
    if (!voiceValue) {
      return res.status(404).send({
        success: false,
        message: "voice not found",
      });
    }

    await voiceRepo.update(id, voiceValue);
    res.send({
      success: true,
      message: "voice Updated Successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

    // Delete Voice
    static async deleteVoice(req: Request, res: Response) {
        const voiceRepo = getRepository(VoiceOverContent);
        const { id } = req.params;

        const result = await voiceRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "voice not found" });
        }

        return res.status(204).send();
    }}