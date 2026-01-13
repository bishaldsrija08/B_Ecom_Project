import { Router } from "express";
import CategoryController from "../controllers/categoryController";
import isAuthenticate, { UserRole } from "../middlewares/isAuthenticate";
import errorHandling from "../services/errorHandling";
const router = Router();


router.route("/categories").get(errorHandling(CategoryController.getAllCategories)).post(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), errorHandling(CategoryController.addCategory))
router.route("/categories/:id").get(errorHandling(CategoryController.getCategoryById)).delete(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), errorHandling(CategoryController.deleteCategoryById)).patch(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), errorHandling(CategoryController.updateCategoryById))


export default router;