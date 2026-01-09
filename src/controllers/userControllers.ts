import { Request, Response } from "express";
import User from "../database/models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../services/generateToken";
import generateOtp from "../services/generateOtp";
import sendMail from "../services/sendMail";

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

        // Check if user already exists
        const existingUser = await User.findOne({
            where: {userEmail}
        })

        if(existingUser){
            res.status(400).json({
                message: "User with this email already exists"
            })
            return;
        }

        await User.create({
            username,
            userEmail,
            userPassword: bcrypt.hashSync(userPassword, 10)
        })
        await sendMail({
            to: userEmail,
            subject: "Welcome to Digital Dookan",
            text: `Hello ${username},\n\nThank you for registering at Digital Dookan! We're excited to have you on board.\n\nBest regards,\nDigital Dookan Team`
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
        const user = await User.findOne({ where: { userEmail } })
        if (!user) {
            res.status(400).json({
                message: "Invalid email or password"
            })
            return
        }

        // Check password
        const isPasswordValid = bcrypt.compare(userPassword, user.userPassword)
        if (!isPasswordValid) {
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

    // send otp
    static async handleForgorPassword(req: Request, res: Response): Promise<void> {
        const { userEmail } = req.body;
        if (!userEmail) {
            res.status(400).json({
                message: "Email is required"
            })
            return
        }

        // check if user exists
        const user = await User.findOne({
            where: {
                userEmail
            }
        })

        if (!user) {
            res.status(400).json({
                message: "User with this email does not exist"
            })
            return
        }

        // Generate OTP
        const otp = generateOtp()

        const toMailData = {
            to: userEmail,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}`
        }

        // send mail
        await sendMail(toMailData)

        // save otp to db
        user.otp = otp.toString();
        user.otpGeneratedTime = Date().toString();
        await user.save();

        res.status(200).json({
            message: "OTP sent to your email"
        })
    }
}

export default UserController;