import { Router } from "express";
import productController from "../controllers/productController";
import isAuthenticate, { UserRole } from "../middlewares/isAuthenticate";
const router = Router();

router.route("/products").get(productController.getAllProducts).post(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), productController.createProduct)
router.route("/products/:id").get(productController.getProductById).delete(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), productController.deleteProductById).patch(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), productController.updateProductById)


export default router;