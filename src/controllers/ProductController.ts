import { Request, Response } from "express";
import { Product } from "../entity/LoanEntity";
import { User } from "../entity/UserEntity";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { Notification } from "../entity/NotificationEntity";
import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage }).single("image");

interface CustomNotification {
  userId: string;
  message: string;0
  title: string;
  onClick: string;
  read: boolean;
}
interface ProductFilters {
  seller?: string;
  category?: string[];
  age?: string[];
  status?: string;
  price?: number;
  skip?: number;
  take?: number;
  sort?: string;
  fields?: string[];
}

async function addProduct(req: Request, res: Response) {
  try {
    const newProduct = await Product.save(req.body);

    // Send notifications to admin
    const admins = await User.find({
      where: { role: "admin" },
    } as FindManyOptions<User>);
    const notificationsPromises = admins.map(async (admin) => {
      const newNotification: CustomNotification = {
        userId: admin._id.toString(),
        message: `New Product added by ${req.body.name}`,
        title: "New Product",
        onClick: "/admin",
        read: false,
      };
      const notification = new Notification();
      notification.title = newNotification.title;
      notification.message = newNotification.message;
      notification.userId = newNotification.userId;
      notification.onClick = newNotification.onClick;
      notification.read = newNotification.read;

      await Notification.save(notification);
    });
    await Promise.all(notificationsPromises);

    res.send({
      success: true,
      message: "Product Added Successfully",
      product: newProduct,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

async function getProducts(req: Request, res: Response) {
  try {
    let {
      seller,
      price,
      status,
      category = [],
      age = [],
      skip = 0,
      take = 10,
      sort = "id",
      fields = [],
    } = req.query as any;

    // Convert fields to array if it's a string
    if (typeof fields === "string") {
      fields = [fields];
    }

    let filters: ProductFilters = {};
    if (seller) {
      filters.seller = seller;
    }
    if (status) {
      filters.status = status;
    }
    // Filter by category
    if (category.length > 0) {
      filters.category = category;
    }
    // Filter by age
    if (age.length > 0) {
      filters.age = age;
    }

    if (price) {
      filters.price = Number(price);
    }
    const validFields = ["id", "name", "price", "category", "age", "status"];

    // Validate the fields query parameter
    if (fields.length > 0) {
      const invalidFields = fields.filter(
        (field: string) => !validFields.includes(field)
      );
      if (invalidFields.length > 0) {
        return res.status(400).send({
          success: false,
          message: `Invalid fields: ${invalidFields.join(", ")}`,
        });
      }
    }

    const products = await Product.find({
      where: filters,
      skip: Number(skip),
      take: Number(take),
      order: {
        [sort]: "ASC",
      },
      select: fields.length > 0 ? fields : undefined,
    } as FindManyOptions<Product>);

    res.send({
      success: true,
      data: products,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}
async function getProductById(req: Request, res: Response) {
  try {
    const product = await Product.findOne({
      where: { id: parseInt(req.params.id) },
      //   If you want to keep seller as a string and not a relation,
      // you should remove relations: ["seller"] from the findOne options, like so:
    });
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.send({
      success: true,
      data: product,
    });
  } catch (error: any) {
    res.send({
      success: false,
      message: error.message,
    });
  }
}

async function editProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Update the product by its ID
    const productValue = await Product.findOne({ where: { id: parseInt(id) } });
    if (!productValue) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    const validFields = [
      "name",
      "description",
      "images",
      "category",
      "age",
      "price",
      "billAvailable",
      "WarrantyAvailable",
      "AccessoriesAvailable",
      "boxAvailable",
      "status",
      "showBidsOnProductPage",
      "seller",
    ];
    const updateData = { ...req.body };
    delete updateData.userId;

    const updates = Object.keys(updateData);

    const isValidOperation = updates.every((update) =>
      validFields.includes(update)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid updates!" });
    }

    await Product.update(id, updateData);
    res.send({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    // delete the product by its ID
    const product = await Product.findOne({
      where: { id: parseInt(req.params.id) },
    });
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    await Product.delete(product.id);

    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}
async function uploadImageToProduct(req: Request, res: Response) {
  try {
    // Handle file upload using multer
    upload(req, res, handleUpload);
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }

  async function handleUpload(err: any) {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "File upload failed",
      });
    }

    try {
      const productId = req.body.productId;

      const product: any = await Product.findOne({ where: { id: productId } });

      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }

      if (!req.file) {
        return res.status(400).send({
          success: false,
          message: "No file uploaded",
        });
      }

      // Ensure that the images property is an array
      if (!Array.isArray(product.images)) {
        product.images = [] as string[];
      }
      // Push the new image path to the existing images array
      product.images.push(req.file.path);

      // Save the updated product entity
      await product.save();

      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: req.file.path, // Return the path of the uploaded file
      });
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: "Error processing the uploaded image",
      });
    }
  }
}
async function updateProductStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;

    // Find the product by its ID
    const updatedProduct = await Product.findOne({
      where: { id: parseInt(req.params.id) },
    });

    // Check if the product exists
    if (!updatedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    const updatedData = { ...req.body };

    const validateStatuses = ["pending", "inactive", "active"];
    if (!validateStatuses.includes(updatedData.status)) {
      return res.status(400).send({
        success: false,
        message: "Invalid status!",
      });
    }
    // Update the product status
    updatedProduct.status = status;
    await updatedProduct.save();

    const newNotification: CustomNotification = {
      userId: updatedProduct.seller.toString(),
      message: `Your product ${updatedProduct.name} has been ${status}`,
      title: "Product Status updated",
      onClick: "/profile",
      read: false,
    };

    // Save the newNotification to the appropriate data store
    // const NotificationEntity = new Notification(newNotification);
    const notification = new Notification();
    notification.title = newNotification.title;
    notification.message = newNotification.message;
    notification.userId = req.body.userId;

    notification.onClick = newNotification.onClick;
    notification.read = newNotification.read;
    await Notification.save(notification);

    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

export {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  uploadImageToProduct,
  updateProductStatus,
};
