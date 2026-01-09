import { Response } from "express";
import sendResponse from "./sendResponse";

const checkOtpExpiration = (res: Response, otpGenerationTime: string) => {
    const currentTime = Date.now();
    const otpGeneratedTime = parseInt(otpGenerationTime)
    const diff = (currentTime - otpGeneratedTime) / 1000;
    if (diff > 120) { // 2 minutes in seconds
        sendResponse(res, 400, "OTP has expired. Please request a new one.");
        return
    }
}

export default checkOtpExpiration;