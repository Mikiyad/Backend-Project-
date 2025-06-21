// src/routes/payments.ts
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Payment } from '../entity/PaymentEntity';

const router = Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: integer
 *               receiver:
 *                 type: integer
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    const payment = getRepository(Payment).create(req.body);
    await getRepository(Payment).save(payment);
    res.status(201).json(payment);
});

export default router;