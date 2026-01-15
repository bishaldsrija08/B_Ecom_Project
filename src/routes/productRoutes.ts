import { Router } from "express";
import productController from "../controllers/productController";
import isAuthenticate, { UserRole } from "../middlewares/isAuthenticate";
import errorHandling from "../services/errorHandling";

const { multer, storage } = require("../middlewares/multerMiddleware");
const upload = multer({ storage: storage });
const router = Router();

router.route("/products").get(productController.getAllProducts).post(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), upload.single("productImage"), productController.createProduct);
router.route("/products/:id").get(productController.getProductById).delete(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), productController.deleteProductById).patch(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), errorHandling(productController.updateProductById))


export default router;