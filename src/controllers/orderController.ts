import { Request, Response } from "express";
import Order from "../database/models/orderMode";
import OrderDetails from "../database/models/orderDetailsModel";
import { IAuthRequest } from "../middlewares/isAuthenticate";
import { PaymentMethod, PaymentStatus } from "../globals/types";
import Payment from "../database/models/paymentModel";

interface IProduct {
    productId: string,
    productQuantity: number
}

class OrderController {

    async createOrder(req: IAuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { phoneNumber, shippingAddress, totalAmount, paymentMethod } = req.body;
        const products: IProduct[] = req.body.products

        if (!phoneNumber || !shippingAddress || !totalAmount || products.length === 0) { // productsma id rw name auxa in the form of array from frontend
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const orderData = await Order.create({
            phoneNumber,
            shippingAddress,
            totalAmount,
            userId
        })

        // for order details
        products.forEach(async function (product) {
            await OrderDetails.create({
                productId: product.productId,
                quantity: product.productQuantity,
                orderId: orderData.id
            })
        })


        // for payment
        if (paymentMethod === PaymentMethod.COD) {
            // Cash on delivery logic
            await Payment.create({
                orderId: orderData.id,
                paymentMethod: PaymentMethod.COD,
                paymentStatus: PaymentStatus.Unpaid
            })

        } else if (paymentMethod === PaymentMethod.Esewa) {
            // esewa payment integration
        } else {
            // Khalti payment integration
        }

        res.status(200).json({
            message: "Order created successfully",
            data: orderData
        })
    }
}

export default new OrderController