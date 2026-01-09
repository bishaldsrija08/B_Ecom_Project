import { Router } from "express";
import UserController from "../controllers/userControllers";
import User from "../database/models/userModel";
const router = Router();

router.route("/register").post(UserController.registerUser)
router.route("/login").post(UserController.loginUser)
router.route("/reset-password").post(UserController.handleForgorPassword)





export default router;