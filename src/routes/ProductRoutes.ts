import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  uploadImageToProduct,
  updateProductStatus,
} from "../controllers/ProductController";
import authMiddleware from "../middlewares/authMiddleware";
const router = express.Router();
// Routes for Product operations
/**
 * @swagger
 * /api/products/add-product:
 *   post:
 *     tags: ["Product Operations"]
 *     summary: Add a new product
 *     description: Add a new product to the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: "Abebe"
 *               description:
 *                 type: string
 *                 default: "product description"
 *               images:
 *                 type: string
 *                 default: "https://example.com/profile.jpg"
 *               category:
 *                 type: string
 *               age:
 *                 type: number
 *                 default: 23
 *               price:
 *                 type: number
 *                 default: 457
 *               billAvailable:
 *                 type: boolean
 *                 default: true
 *               WarrantyAvailable:
 *                 type: boolean
 *                 default: false
 *               AccessoriesAvailable:
 *                 type: boolean
 *                 default: true
 *               boxAvailable:
 *                 type: boolean
 *                 default: true
 *               status:
 *                 type: string
 *                 default: "pending"
 *               showBidsOnProductPage:
 *                 type: boolean
 *                 default: false
 *               userId:
 *                 type: number
 *                 default: 1
 *               seller:
 *                 type: string
 *                 default: "user"
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 product:
 *                   type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error adding product
 */
router.post("/add-product", authMiddleware, addProduct);

/**
 * @swagger
 * /api/products/get-products:
 *   get:
 *     tags: ["Product Operations"]
 *     summary: Get all products
 *     description: Get all products with optional filters
 *     parameters:
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: The categories to filter by
 *       - in: query
 *         name: age
 *         schema:
 *           type: array
 *           items:
 *             type: number
 *         description: The age ranges to filter by
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: The status to filter by
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: The price to filter by
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *         description: The number of records to skip for pagination
 *       - in: query
 *         name: take
 *         schema:
 *           type: number
 *         description: The number of records to take for pagination
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: fields
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: The fields to return in the response
 *     responses:
 *       200:
 *         description: The list of the products
 *       500:
 *         description: Server error
 */
router.get("/get-products", getProducts);
/**
 * @swagger
 * /api/products/get-product-by-id/{id}:
 *   get:
 *     tags: ["Product Operations"]
 *     summary: Get a product by id
 *     description: Get a product by its id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the product to get
 *     responses:
 *       200:
 *         description: The product data
 *       500:
 *         description: Server error
 */
router.get("/get-product-by-id/:id", getProductById);
/**
 * @swagger
 * /api/products/edit-product/{id}:
 *   put:
 *     tags: ["Product Operations"]
 *     summary: Edit a product
 *     security:
 *      - bearerAuth: []
 *     description: Edit a product by its id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the product to edit
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: Adanech
 *               price:
 *                 type: number
 *                 default: 213
 *
 *     responses:
 *       200:
 *         description: The product was updated successfully
 *       500:
 *         description: Server error
 */
router.put("/edit-product/:id", authMiddleware, editProduct);

/**
 * @swagger
 * /api/products/delete-product/{id}:
 *   delete:
 *     tags: ["Product Operations"]
 *     summary: Delete a product
 *     security:
 *      - bearerAuth: []
 *     description: Delete a product by its id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the product to delete
 *     responses:
 *       200:
 *         description: The product was deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/delete-product/:id", authMiddleware, deleteProduct);
/**
 * @openapi
 * /api/products/upload-image-to-product/{id}:
 *   post:
 *     tags: ["Product Operations"]
 *     summary: Upload an image for a product
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the product to upload an image for
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       500:
 *         description: Error uploading image
 */
router.post(
  "/upload-image-to-product/:id",
  authMiddleware,
  uploadImageToProduct
);
/**
 * @swagger
 * /api/products/update-product-status/{id}:
 *   put:
 *     tags: ["Product Operations"]
 *     summary: Update product status
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["pending","inactive","active"]
 *                 default: pending
 *     responses:
 *       200:
 *         description: Product status updated successfully
 *       500:
 *         description: Error updating product status
 */
router.put("/update-product-status/:id", authMiddleware, updateProductStatus);

export { router as ProductRoutes };
