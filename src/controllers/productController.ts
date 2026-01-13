import { Request, Response } from "express";
import Product from "../database/models/productMode";
import Category from "../database/models/categoryModel";


class ProductController {
    async createProduct(req: Request, res: Response): Promise<void> {
        const { productName, productDescription, productPrice, productStockQty, productDiscountPercent, categoryId } = req.body
        const productImageUrl = req.file ? req.file.filename : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLCexwutNZt0aSRMrVRLoXtex8XMNyWxjD4Q&s"

        if (!productName || !productDescription || !productPrice || !productStockQty || !categoryId) {
            res.status(400).json({
                message: "All fields are required"
            })
            return
        }

        // create a project
        const product = await Product.create({
            productName,
            productDescription,
            productPrice,
            productStockQty,
            categoryId,
            productImageUrl,
            productDiscountPercent: productDiscountPercent || 0 // default to 0 if not provided
        })
        res.status(200).json({
            message: "Product created successfully",
            data: product
        })
    }

    // Get all products
    async getAllProducts(req: Request, res: Response): Promise<void> {
        const products = await Product.findAll({
            include: {
                model: Category,
                attributes: ["id", "categoryName"]
            }
        })
        if (products.length === 0) {
            res.status(400).json({
                message: "No products found"
            })
            return
        }
        res.status(200).json({
            message: "Products retrieved successfully",
            data: products
        })
    }

    // Get product by id

    async getProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const product = await Product.findByPk(id, {
            include: {
                model: Category,
                attributes: ["id", "categoryName"]
            }
        })
        if (!product) {
            res.status(400).json({
                message: "Product not found"
            })
            return
        }
        res.status(200).json({
            message: "Product retrieved successfully",
            data: product
        })
    }

    // Delete product by id
    async deleteProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(400).json({
                message: "Product not found"
            })
            return
        }

        await Product.destroy({
            where: { id }
        })
        res.status(200).json({
            message: "Product deleted successfully"
        })
    }

    // Update product by id
    async updateProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        const { productName, productDescription, productPrice, productStockQty, productDiscountPercent, categoryId } = req.body

        const product = await Product.findByPk(id)
        if (!product) {
            res.status(400).json({
                message: "Product not found"
            })
            return
        }

        let fileName
        if (req.file) {
            fileName = req.file.filename
        } else {
            fileName = product.productImageUrl
        }

        await Product.update({
            productName,
            productDescription,
            productPrice,
            productStockQty,
            productImageUrl: fileName,
            productDiscountPercent: productDiscountPercent || 0,
            categoryId
        }, {
            where: {id}
        })
        res.status(200).json({
            message: "Product updated successfully"
        })
    }
}

export default new ProductController