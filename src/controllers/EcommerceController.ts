import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Seller } from "../entity/SellerEntity";
import { Buyer } from "../entity/BuyerEntity";
import { Product } from "../entity/ProductEntity";
import { Order } from "../entity/OrderEntity";
import { OrderItem } from "../entity/OrderItemEntity";

export class EcController {
    // Seller methods
    static async createSeller(req: Request, res: Response) {
        const sellerRepo = getRepository(Seller);
        const seller = sellerRepo.create(req.body);
        await sellerRepo.save(seller);
        return res.json(seller);
    }

    static async getSellers(req: Request, res: Response) {
        const sellerRepo = getRepository(Seller);
        const sellers = await sellerRepo.find({ relations: ["products", "orders"] });
        return res.json(sellers);
    }

    static async updateSeller(req: Request, res: Response) {
        const sellerRepo = getRepository(Seller);
        const { id } = req.params;
    
        const seller = await sellerRepo.findOne({
            where: { seller_id: Number(id) }, // use the correct column name
        });
    
        if (!seller) {
            return res.status(404).json({ message: "Seller not found" });
        }
    
        sellerRepo.merge(seller, req.body);
        await sellerRepo.save(seller);
        return res.json(seller);
    }
    

    static async deleteSeller(req: Request, res: Response) {
        const sellerRepo = getRepository(Seller);
        const { id } = req.params;

        const result = await sellerRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Seller not found" });
        }

        return res.status(204).send();
    }

    // Buyer methods
    static async createBuyer(req: Request, res: Response) {
        const buyerRepo = getRepository(Buyer);
        const buyer = buyerRepo.create(req.body);
        await buyerRepo.save(buyer);
        return res.json(buyer);
    }

    static async getBuyers(req: Request, res: Response) {
        const buyerRepo = getRepository(Buyer);
        const buyers = await buyerRepo.find({ relations: ["orders"] });
        return res.json(buyers);
    }

    static async updateBuyer(req: Request, res: Response) {
        const buyerRepo = getRepository(Buyer);
        const { id } = req.params;
    
        const buyer = await buyerRepo.findOne({
            where: { buyer_id: Number(id) }, // use the correct PK field
        });
    
        if (!buyer) {
            return res.status(404).json({ message: "Buyer not found" });
        }
    
        buyerRepo.merge(buyer, req.body);
        await buyerRepo.save(buyer);
        return res.json(buyer);
    }
    

    static async deleteBuyer(req: Request, res: Response) {
        const buyerRepo = getRepository(Buyer);
        const { id } = req.params;

        const result = await buyerRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Buyer not found" });
        }

        return res.status(204).send();
    }

    // Product methods
    static async createProduct(req: Request, res: Response) {
        const productRepo = getRepository(Product);
        const product = productRepo.create(req.body);
        await productRepo.save(product);
        return res.json(product);
    }

    static async getProducts(req: Request, res: Response) {
        const productRepo = getRepository(Product);
        const products = await productRepo.find({ relations: ["seller"] });
        return res.json(products);
    }

    static async updateProduct(req: Request, res: Response) {
    const productRepo = getRepository(Product);
    const { id } = req.params;

    const product = await productRepo.findOne({
        where: { product_id: Number(id) }, // replace with correct PK if different
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    productRepo.merge(product, req.body);
    await productRepo.save(product);
    return res.json(product);
}

    static async deleteProduct(req: Request, res: Response) {
        const productRepo = getRepository(Product);
        const { id } = req.params;

        const result = await productRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(204).send();
    }

    // Order methods
    static async createOrder(req: Request, res: Response) {
        const orderRepo = getRepository(Order);
        const order = orderRepo.create(req.body);
        await orderRepo.save(order);
        return res.json(order);
    }

    static async getOrders(req: Request, res: Response) {
        const orderRepo = getRepository(Order);
        const orders = await orderRepo.find({ relations: ["buyer", "order_items"] });
        return res.json(orders);
    }
    static async updateOrder(req: Request, res: Response) {
        const orderRepo = getRepository(Order);
        const { id } = req.params;
    
        const order = await orderRepo.findOne({
            where: { order_id: Number(id) } // Use `order_id` if that's your actual PK
        });
    
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
    
        orderRepo.merge(order, req.body);
        await orderRepo.save(order);
        return res.json(order);
    }
    

    static async deleteOrder(req: Request, res: Response) {
        const orderRepo = getRepository(Order);
        const { id } = req.params;

        const result = await orderRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(204).send();
    }

    // Order Item methods
    static async createOrderItem(req: Request, res: Response) {
        const orderItemRepo = getRepository(OrderItem);
        const orderItem = orderItemRepo.create(req.body);
        await orderItemRepo.save(orderItem);
        return res.json(orderItem);
    }

    static async getOrderItems(req: Request, res: Response) {
        const orderItemRepo = getRepository(OrderItem);
        const orderItems = await orderItemRepo.find({ relations: ["order", "product"] });
        return res.json(orderItems);
    }

    static async updateOrderItem(req: Request, res: Response) {
        const orderItemRepo = getRepository(OrderItem);
        const { id } = req.params;

        const orderItem = await orderItemRepo.findOne({where:{order_item_id:Number(id)}});
        if (!orderItem) {
            return res.status(404).json({ message: "Order item not found" });
        }

        orderItemRepo.merge(orderItem, req.body);
        await orderItemRepo.save(orderItem);
        return res.json(orderItem);
    }

    static async deleteOrderItem(req: Request, res: Response) {
        const orderItemRepo = getRepository(OrderItem);
        const { id } = req.params;

        const result = await orderItemRepo.delete(id);
        if (result.affected === 0) {
            return res.status(404).json({ message: "Order item not found" });
        }

        return res.status(204).send();
    }
}
