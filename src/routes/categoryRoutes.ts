import { Router } from "express";
import CategoryController from "../controllers/categoryController";
const router = Router();


router.route("/categories").get(CategoryController.getAllCategories).post(CategoryController.addCategory)
router.route("/categories/:id").get(CategoryController.getCategoryById).delete(CategoryController.deleteCategoryById).patch(CategoryController.updateCategoryById)


export default router;