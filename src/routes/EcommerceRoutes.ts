import * as express from "express";
import { EcController } from "../controllers/EcommerceController";

const router = express.Router();
// Seller routes
router.post("/sellers", EcController.createSeller);
router.get("/sellers", EcController .getSellers);
router.put("/sellers/:id", EcController .updateSeller);
router.delete("/sellers/:id", EcController .deleteSeller);

// Buyer routes
router.post("/buyers", EcController .createBuyer);
router.get("/buyers", EcController .getBuyers);
router.put("/buyers/:id", EcController .updateBuyer);
router.delete("/buyers/:id", EcController .deleteBuyer);

// Product routes
router.post("/products", EcController .createProduct);
router.get("/products", EcController .getProducts);
router.put("/products/:id", EcController .updateProduct);
router.delete("/products/:id", EcController .deleteProduct);

// Order routes
router.post("/orders", EcController .createOrder);
router.get("/orders", EcController .getOrders);
router.put("/orders/:id", EcController .updateOrder);
router.delete("/orders/:id", EcController .deleteOrder);

// Order Item routes
router.post("/order-items", EcController .createOrderItem);
router.get("/order-items", EcController .getOrderItems);
router.put("/order-items/:id", EcController .updateOrderItem);
router.delete("/order-items/:id", EcController .deleteOrderItem);

export {router as EcommerceRoutes};