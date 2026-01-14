import dotenv from 'dotenv';
dotenv.config();



export const envConfig = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    email: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASS,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    khaltiSecretKey: process.env.KHALTI_SECRET_KEY
}