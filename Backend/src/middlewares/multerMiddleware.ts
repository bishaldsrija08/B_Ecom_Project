

import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedFileTypes.includes(file.mimetype)) {
            cb(new Error("Invalid file type"))
            return
        }
        // Check size limit (2mb)
        const allowedSize = 2 * 1024 * 1024; // 2MB
        if (file.size > allowedSize) {
            cb(new Error("File size exceeds limit of 2MB"))
            return
        }
        cb(null, "./src/uploads");
    },
    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

export {
    multer,
    storage
}