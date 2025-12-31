import { Request, Response } from "express";
import User from "../database/models/userModel";


class UserController {
    // User controller methods would go here

    static async registerUser(req: Request, res: Response): Promise<void> {
        // Registration logic
        const { username, userEmail, userPassword } = req.body;

        if (!username || !userEmail || !userPassword) {
            res.status(400).json({
                message: "All fields are required"
            })
            return;
        }
        await User.create({
            username,
            userEmail,
            userPassword
        })
        res.status(200).json({
            message: "User registered successfully"
        })
    }
}


export default UserController;