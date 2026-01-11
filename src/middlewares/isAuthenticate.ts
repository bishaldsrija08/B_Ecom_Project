import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { envConfig } from "../config/config";
import User from "../database/models/userModel";

interface IAuthRequest extends Request {
    user?: {
        id: string,
        username: string,
        userEmail: string,
        userPassword: string,
        userRole: string
    }
}

class IsAuthenticate {
    async isAuthenticated(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {

        // receive token from headers
        const token = req.headers.authorization

        if (!token && token === undefined && token === null) {
            res.status(401).json({
                message: "Unauthorized"
            })
        }

        // verify token
        jwt.verify(token as string, envConfig.jwtSecret as string, async (err, decoded: any) => {
            if (err) {
                res.status(401).json({
                    message: "Invalid Token"
                })
                return
            }
            const id = decoded.userId
            console.log(decoded)
            // find user by id
            const userData = await User.findByPk(id, {
                attributes: {exclude: ["otp", "otpGeneratedTime", "createdAt", "updatedAt"]}
            })
            if (!userData) {
                res.status(401).json({
                    message: "User not found"
                })
                return
            }
            req.user = userData
            next()
        })
    }
}

export default new IsAuthenticate