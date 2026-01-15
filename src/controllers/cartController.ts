import { Request, Response } from "express";
import { IAuthRequest } from "../middlewares/isAuthenticate";
import Cart from "../database/models/cartModel";
import Product from "../database/models/productMode";


class CartController {
    async addToCart(req: IAuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { productId, quantity } = req.body

        if (!productId || !quantity) {
            res.status(400).json({ message: "Product ID and quantity are required" })
            return
        }

        let cartItem = await Cart.findOne({
            where: {
                userId,
                productId
            }
        })

        if (cartItem) {
            cartItem.quantity += quantity
            await cartItem.save()

            res.status(200).json({
                message: "Cart updated successfully"
            })
        } else {
            cartItem = await Cart.create({
                userId,
                productId,
                quantity
            })
            res.status(200).json({
                message: "Product added to cart successfully"
            })
        }
    }

    // get cart items for a user
    async getCartItems(req: IAuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id

        const cartItems = await Cart.findAll({
            where: {
                userId // particular user ko matra cart items haru fetch garne
            },
            include: {
                model: Product,
                attributes: ["productName", "productPrice"]
            }
        })
        if (cartItems.length === 0) {
            res.status(200).json({ message: "Cart is empty", cartItems: [] })
        } else {
            res.status(200).json({
                message: "Cart items fetched successfully",
                data: cartItems
            })
        }
    }

    // remove item from cart
    async removeItemFromCart(req: IAuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const productId = req.params.productId

        // check if the cart item exists
        const cartItem = await Cart.findOne({
            where: {
                userId,
                productId
            }
        })

        if (!cartItem) {
            res.status(404).json({ message: "Cart item not found" })
            return
        }

        await Cart.destroy({
            where: {
                userId,
                productId
            }
        })
        res.status(200).json({ message: "Item removed from cart successfully" })
    }

    // Update cart item quantity
    async updateCartItem(req: IAuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const productId = req.params.productId
        const { quantity } = req.body

        if(!quantity){
            res.status(400).json({ message: "Quantity is required" })
            return
        }

        // check if the cart item exists
        const cartItem = await Cart.findOne({
            where: {
                userId,
                productId
            }
        })

        if(!cartItem){
            res.status(404).json({ message: "Cart item not found" })
            return
        }

        cartItem.quantity = quantity
        await cartItem.save()
        res.status(200).json({ message: "Cart item updated successfully" })
    }
}

export default new CartController