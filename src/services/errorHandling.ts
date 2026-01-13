import { NextFunction, Request, Response } from "express"


const errorHandling = (fn: Function) => {
    return async (req: Request, res: Response) => {
        fn(req, res).catch((err: Error) => {
            res.status(500).json({
                message: "Internal Server Error",
                errror: err.message
            })
            return
        })
    }
}

export default errorHandling;