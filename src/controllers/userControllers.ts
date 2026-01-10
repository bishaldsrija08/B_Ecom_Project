import { Request, Response } from "express";
import User from "../database/models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../services/generateToken";
import generateOtp from "../services/generateOtp";
import sendMail from "../services/sendMail";
import checkOtpExpiration from "../services/checkOtpExpiration";
import sendResponse from "../services/sendResponse";

class UserController {
    // User controller methods would go here

    static async registerUser(req: Request, res: Response): Promise<void> {
        // Registration logic
        const { username, userEmail, userPassword } = req.body;

        if (req.body.userRole == "admin") {
            sendResponse(res, 400, "Cannot register as admin");
            return
        }

        if (!username || !userEmail || !userPassword) {
            res.status(400).json({
                message: "All fields are required"
            })
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            where: { userEmail }
        })

        if (existingUser) {
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
        user.otpGeneratedTime = Date.now().toString();
        await user.save();

        res.status(200).json({
            message: "OTP sent to your email"
        })
    }

    // Verify otp
    static async verifyOtp(req: Request, res: Response): Promise<void> {
        const { userEmail, otp } = req.body;
        if (!userEmail || !otp) {
            res.status(400).json({
                message: "All fields are required"
            })
        }

        // check if user exists
        const user = await User.findOne({
            where: { userEmail }
        })

        if (!user) {
            res.status(400).json({
                message: "User with this email does not exist"
            })
            return
        }

        // otp verification
        const data = await User.findOne({
            where: {
                userEmail,
                otp
            }
        })
        if (!data) {
            res.status(400).json({
                message: "Invalid OTP"
            })
            return
        }

        // check otp expiry (2 minutes)

        checkOtpExpiration(res, data.otpGeneratedTime)

        // otp is valid
        res.status(200).json({
            message: "OTP verified successfully"
        })
    }

    // Reset password
    static async resetPassword(req: Request, res: Response): Promise<void> {
        const { userEmail, newPassword, confirmPassword } = req.body;
        if (!userEmail || !newPassword || !confirmPassword) {
            sendResponse(res, 400, "All fields are required")
            return
        }

        // check if passwords match
        if (newPassword !== confirmPassword) {
            sendResponse(res, 400, "Passwords do not match")
            return
        }

        // check if user exists
        const user = await User.findOne({
            where: { userEmail }
        })

        if (!user) {
            sendResponse(res, 400, "User with this email does not exist")
            return
        }

        // update password
        user.userPassword = bcrypt.hashSync(newPassword, 10)
        await user.save()
        sendResponse(res, 200, "Password reset successfully")
    }
}

export default UserController;