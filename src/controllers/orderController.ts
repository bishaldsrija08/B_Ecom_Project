import { Response } from "express";
import Order from "../database/models/orderMode";
import OrderDetails from "../database/models/orderDetailsModel";
import { IAuthRequest } from "../middlewares/isAuthenticate";
import { PaymentMethod, PaymentStatus } from "../globals/types";
import Payment from "../database/models/paymentModel";
import axios from "axios";
import { envConfig } from "../config/config";

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


        // for payment=> cod, esewa, khalti

        // Cash on delivery logic
        const paymentData = await Payment.create({
            orderId: orderData.id,
            paymentMethod: PaymentMethod.COD,
            paymentStatus: PaymentStatus.Unpaid
        })

        if (paymentMethod === PaymentMethod.Esewa) {
            // esewa payment integration

        } else {
            // Khalti payment integration
            const khaltiPaymentData = {
                return_url: "http://localhost:5173/",
                website_url: "http://localhost:5173",
                amount: totalAmount * 100, // in paisa
                purchase_order_id: orderData.id,
                purchase_order_name: "Order Payment" + orderData.id

            }
            const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", khaltiPaymentData, {
                headers: {
                    Authorization: "Key " + envConfig.khaltiSecretKey as string
                }
            })
            const khaltiResponse = response.data
            const pidx = khaltiResponse.pidx
            paymentData.pidx = pidx
            await paymentData.save()

            res.status(200).json({
                message: "Order created successfully",
                data: khaltiResponse.payment_url
            })
        }
    }
}

export default new OrderController