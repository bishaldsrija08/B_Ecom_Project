import { Router } from "express";
import UserController from "../controllers/userControllers";
const router = Router();

router.route("/register").post(UserController.registerUser)
router.route("/login").post(UserController.loginUser)





export default router;