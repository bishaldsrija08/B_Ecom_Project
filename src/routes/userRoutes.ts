import { Router } from "express";
import UserController from "../controllers/userControllers";
const router = Router();

router.route("/register").post(UserController.registerUser)






export default router;