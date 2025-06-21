import * as express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getUsers,
  updateUserStatus,forgotPassword,resetPassword,updateUser
} from "../controllers/UserControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Routes for User operations
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags: ["User Operations"]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: "John Doe"
 *               email:
 *                 type: string
 *                 default: "johndoe@example.com"
 *               tinNumber:
 *                 type: string
 *                 default: "0987654310"
 *               password:
 *                 type: string
 *                 default: "password123"
 *               role:
 *                 type: string
 *                 default: "user"
 *               status:
 *                 type: string
 *                 default: "pending"
 *               profilePictureUrl:
 *                 type: string
 *                 default: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error registering user
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: ["User Operations"]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tinNumber:
 *                 type: string
 *                 default: 12345609
 *               password:
 *                 type: string
 *                 default: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error logging in user
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/users/get-current-user:
 *   get:
 *     tags: ["User Operations"]
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Error fetching user
 */
router.get("/get-current-user", authMiddleware, getCurrentUser);
/**
 * @swagger
 * /api/users/get-users:
 *   get:
 *     tags: ["User Operations"]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error fetching users
 */
router.get("/get-users", authMiddleware, getUsers);

/**
 * @swagger
 * /api/users/update-user-status/{id}:
 *   put:
 *     tags: ["User Operations"]
 *     summary: Update user status
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 default: pending
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Error updating user status
 */
router.put("/update-user-status/:id", authMiddleware, updateUserStatus);

router.put("/update-user",authMiddleware,updateUser);
router.post("/forgotPassword",authMiddleware,forgotPassword);
router.post("reset-password",authMiddleware,resetPassword);

export { router as UserRoutes };
