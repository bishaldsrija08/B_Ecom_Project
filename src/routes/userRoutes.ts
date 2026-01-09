import { Router } from "express";
import UserController from "../controllers/userControllers";
const router = Router();

router.route("/register").post(UserController.registerUser)
router.route("/login").post(UserController.loginUser)
router.route("/reset-password").post(UserController.handleForgorPassword)
router.route("/verify-otp").post(UserController.verifyOtp)





export default router;