import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { envConfig } from "../config/config";
import User from "../database/models/userModel";

export interface IAuthRequest extends Request {
    user?: {
        id: string,
        username: string,
        userEmail: string,
        userPassword: string,
        userRole: string
    }
}

export enum UserRole {
    Admin = "admin",
    Customer = "customer"
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
            
            // find user by id
            const userData = await User.findByPk(id, {
                attributes: { exclude: ["otp", "otpGeneratedTime", "createdAt", "updatedAt"] }
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

    // Role based authorization

    restrictTo(...roles: UserRole[]) {    // rest operator to accept multiple roles
        return (req: IAuthRequest, res: Response, next: NextFunction) => {
            let userRole = req.user?.userRole
            if (!roles.includes(userRole as UserRole)) {
                res.status(403).json({
                    message: "Forbidden: You do not have permission to perform this action"
                })
                return
            }
            next()
        }
    }
}

export default new IsAuthenticate