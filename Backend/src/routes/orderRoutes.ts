

import { Router } from "express";
import isAuthenticate from "../middlewares/isAuthenticate";
import orderController from "../controllers/orderController";
import errorHandling from "../services/errorHandling";
const router = Router();

router.route("/order").post(isAuthenticate.isAuthenticated, errorHandling(orderController.createOrder))
router.route("/verify-pidx").post(isAuthenticate.isAuthenticated, errorHandling(orderController.verifyKhaltiPayment))









export default router;