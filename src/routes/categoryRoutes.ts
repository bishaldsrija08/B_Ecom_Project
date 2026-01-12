import { Router } from "express";
import CategoryController from "../controllers/categoryController";
import isAuthenticate, { UserRole } from "../middlewares/isAuthenticate";
const router = Router();


router.route("/categories").get(CategoryController.getAllCategories).post(isAuthenticate.isAuthenticated, isAuthenticate.restrictTo(UserRole.Admin), CategoryController.addCategory)
router.route("/categories/:id").get(CategoryController.getCategoryById).delete(CategoryController.deleteCategoryById).patch(CategoryController.updateCategoryById)


export default router;