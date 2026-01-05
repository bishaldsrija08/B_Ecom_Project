import { Request, Response } from "express";
import User from "../database/models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../services/generateToken";

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
            userPassword: bcrypt.hashSync(userPassword, 10)
        })
        res.status(200).json({
            message: "User registered successfully"
        })
    }

    // Login method
    static async loginUser(req: Request, res: Response): Promise<void> {
        const { userEmail, userPassword } = req.body
        if (!userEmail || !userEmail) {
            res.status(400).json({
                message: "Email and password are required"
            })
            return
        }

        // check if user exists
        const user = await User.findOne({ where:  {userEmail}  })
        if (!user) {
            res.status(400).json({
                message: "Invalid email or password"
            })
            return
        }

        // Check password
        const isPasswordValid = bcrypt.compare(userPassword, user.userPassword)
        if(!isPasswordValid){
            res.status(400).json({
                message: "Invalid email or password"
            })
            return
        }

        const token = generateToken(user.id)

        res.status(200).json({
            message: "Login successful",
            data: token
        })
    }
}

export default UserController;