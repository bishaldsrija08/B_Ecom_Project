
import { Request, Response } from "express";
import Category from "../database/models/categoryModel"
import sendResponse from "../services/sendResponse";

class CategoryController {
    // seed categories data
    static categories = [
        {
            categoryName: "Electronics",
            categoryDescription: "Devices and gadgets including phones, laptops, and accessories."
        },
        {
            categoryName: "Books",
            categoryDescription: "A wide range of books from fiction to non-fiction, educational to entertainment."
        },
        {
            categoryName: "Clothing",
            categoryDescription: "Apparel for men, women, and children including casual wear, formal wear, and accessories."
        }
    ]

    // Seed categories function
    static async seedCategories(): Promise<void> {
        // Check if categories already exist
        const categoryData = await Category.findAll();
        if (categoryData.length === 0) {
            // Seed categories in bulk
            await Category.bulkCreate(this.categories)
            console.log("Categories seeded successfully.");
        } else {
            console.log("Categories already exist. Seeding skipped.");
        }
    }

    // Add more category

    static async addCategory(req: Request, res: Response): Promise<void> {
        const { categoryName, categoryDescription } = req.body;

        if (!categoryDescription || !categoryName) {
            sendResponse(res, 400, "All fields are required");
            return;
        }

        const categories = await Category.create({
            categoryName,
            categoryDescription
        })

        res.status(200).json({
            message: "Category added successfully",
            data: categories
        })
    }

    // Get all categories

    static async getAllCategories(req: Request, res: Response): Promise<void> {
        const categories = await Category.findAll();
        sendResponse(res, 200, "Categories fetched successfully", categories);
    }

    // Get category by ID

    static async getCategoryById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const category = await Category.findByPk(id); // array

        if (!category) {
            sendResponse(res, 404, "Category not found");
            return
        }
        res.status(200).json({
            message: "Category fetched successfully",
            data: category
        })
    }

    // Delete category by ID

    static async deleteCategoryById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(400).json({
                message: "Category not found"
            })
        }
        await Category.destroy({
            where: { id }
        })
        res.status(200).json({
            message: "Category deleted successfully"
        })
    }

    // Update category by ID

    static async updateCategoryById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { categoryName, categoryDescription } = req.body;

        if (!categoryName || !categoryDescription) {
            sendResponse(res, 400, "All fields are required");
            return;
        }

        // Check if category exists
        let existingCategory = await Category.findByPk(id);

        if (!existingCategory) {
            res.status(400).json({
                message: "Category not found"
            })
            return
        }

        await Category.update({
            categoryName,
            categoryDescription
        }, {
            where: { id }
        })

        existingCategory = await Category.findByPk(id);

        res.status(200).json({
            message: "Category updated successfully",
            data: existingCategory
        })
    }
}

export default CategoryController;