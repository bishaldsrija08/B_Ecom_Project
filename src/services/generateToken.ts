import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";

export function generateToken(userId: string) {
    // Generate token
    const token = jwt.sign({ userId: userId }, envConfig.jwtSecret as string, {
        expiresIn: "20d"

    })
    return token;
}


export default generateToken;