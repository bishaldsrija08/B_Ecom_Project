import { Router } from "express";
import isAuthenticate, { UserRole } from "../middlewares/isAuthenticate";
import errorHandling from "../services/errorHandling";
import cartController from "../controllers/cartController";
const router = Router();

router.route("/cart").post(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Customer),errorHandling(cartController.addToCart)).get(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Customer),errorHandling(cartController.getCartItems));

router.route("/cart/:productId").delete(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Customer), errorHandling(cartController.removeItemFromCart)).patch(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Customer),errorHandling(cartController.updateCartItem))





export default router;