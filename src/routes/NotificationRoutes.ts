import express from 'express';
import { addNotification, getAllNotifications, deleteNotification, readAllNotifications } from '../controllers/NotificationsController';
import authMiddleware from '../middlewares/authMiddleware';
const router = express.Router();
/**
 * @swagger
 * /api/notifications/notify:
 *  post:
 *   tags: ["Notification Operations"]
 *   summary: Add a new notification
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        message:
 *         type: string
 *        read:
 *         type: boolean
 *        user_id:
 *         type: number
 *   responses:
 *    200:
 *     description: Notification added successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         message:
 *          type: string
 *    500:
 *     description: Error adding notification
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         message:
 *          type: string
 */
router.post('/notify', addNotification);

/**
 * @swagger
 * /api/notifications/get-all-notifications:
 *  get:
 *   tags: ["Notification Operations"]
 *   summary: Get all notifications for a user
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: query
 *      name: id
 *      schema:
 *       type: number
 *      description: The ID of the user
 *   responses:
 *    200:
 *     description: Notifications retrieved successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         data:
 *          type: array
 *          items:
 *           type: object
 *           properties:
 *            id:
 *             type: number
 *            title:
 *             type: string
 *            message:
 *             type: string
 *            read:
 *             type: boolean
 *            user_id:
 *             type: number
 *    500:
 *     description: Error retrieving notifications
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         message:
 *          type: string
 */
router.get('/get-all-notifications', authMiddleware, getAllNotifications);

/**
 * @swagger
 * /api/notifications/delete-notification/{id}:
 *  delete:
 *   tags: ["Notification Operations"]
 *   summary: Delete a notification
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: number
 *      required: true
 *      description: The ID of the notification
 *   responses:
 *    200:
 *     description: Notification deleted successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         message:
 *          type: string
 *    500:
 *     description: Error deleting notification
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         message:
 *          type: string
 */
router.delete('/delete-notification/:id', authMiddleware, deleteNotification);

/**
 * @swagger
 * /api/notifications/read-all-notifications:
 *  put:
 *   tags: ["Notification Operations"]
 *   summary: Mark all notifications as read for a user
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        userId:
 *         type: string
 *   responses:
 *    200:
 *     description: All notifications marked as read
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         message:
 *          type: string
 *    500:
 *     description: Error marking notifications as read
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         success:
 *          type: boolean
 *         message:
 *          type: string
 */
router.put('/read-all-notifications', authMiddleware, readAllNotifications);


export { router as NotificationRoutes };
