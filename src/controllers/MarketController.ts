import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Market } from "../entity/MarketEntity";
import { Exchange } from "../entity/ExchangeEntity";

export class MarketController {
    // Market methods
    static async createMarket(req: Request, res: Response) {
        const marketRepo = getRepository(Market);
        const market = marketRepo.create(req.body);
        await marketRepo.save(market);
        return res.json(market);
    }

    static async getMarkets(req: Request, res: Response) {
        const marketRepo = getRepository(Market);
        const markets = await marketRepo.find({ relations: ["exchanges"] });
        return res.json(markets);
    }
    static async updateMarket(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const marketRepo = getRepository(Market);
    
            // Validate ID
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid market ID" 
                });
            }
    
            // Find existing market record
            const market = await marketRepo.findOne({ 
                where: { price_id: Number(id) }
            });
    
            if (!market) {
                return res.status(404).json({ 
                    success: false,
                    message: "Market record not found" 
                });
            }
    
            // Validate request body
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ 
                    success: false,
                    message: "No update data provided" 
                });
            }
    
            // Prevent updating protected fields
            const protectedFields = ['price_id', 'created_at', 'market_id'];
            for (const field of protectedFields) {
                if (field in req.body) {
                    return res.status(400).json({
                        success: false,
                        message: `Cannot update protected field: ${field}`
                    });
                }
            }
    
            // Update and save
            Object.assign(market, req.body);
            const updatedMarket = await marketRepo.save(market);
    
            return res.status(200).json({
                success: true,
                data: updatedMarket,
                message: "Market updated successfully"
            });
    
        } catch (error) {
            console.error("Update market error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error while updating market"
            });
        }
    }
    static async deleteMarket(req: Request, res: Response) {
        const marketRepo = getRepository(Market);
        const { id } = req.params;

        const result = await marketRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Market not found" });
        }

        return res.status(204).send();
    }

    // Exchange methods
    static async createExchange(req: Request, res: Response) {
        const exchangeRepo = getRepository(Exchange);
        const exchange = exchangeRepo.create(req.body);
        await exchangeRepo.save(exchange);
        return res.json(exchange);
    }

    static async getExchanges(req: Request, res: Response) {
        const exchangeRepo = getRepository(Exchange);
        const exchanges = await exchangeRepo.find({ relations: ["market"] });
        return res.json(exchanges);
    }

    static async updateExchange(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const exchangeRepo = getRepository(Exchange);
    
            // Validate ID
            const exchangeId = Number(id);
            if (isNaN(exchangeId) || exchangeId <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid exchange ID format"
                });
            }
    
            // Find existing exchange
            const exchange = await exchangeRepo.findOne({ 
                where: { crop_id: exchangeId } 
            });
    
            if (!exchange) {
                return res.status(404).json({
                    success: false,
                    message: "Exchange record not found"
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
            const protectedFields = ['id', 'createdAt', 'updatedAt'];
            const invalidUpdates = protectedFields.filter(field => field in req.body);
            if (invalidUpdates.length > 0) {
                return res.status(403).json({
                    success: false,
                    message: `Cannot update protected fields: ${invalidUpdates.join(', ')}`
                });
            }
    
            // Apply updates
            Object.assign(exchange, req.body);
            const updatedExchange = await exchangeRepo.save(exchange);
    
            return res.status(200).json({
                success: true,
                data: updatedExchange,
                message: "Exchange updated successfully"
            });
    
        } catch (error:any) {
            console.error('[ExchangeController] Update error:', error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while updating exchange",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    static async deleteExchange(req: Request, res: Response) {
        const exchangeRepo = getRepository(Exchange);
        const { id } = req.params;

        const result = await exchangeRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Exchange not found" });
        }

        return res.status(204).send();
    }
}