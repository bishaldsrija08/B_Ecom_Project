import { envConfig } from "./config/config";
import User from "./database/models/userModel"
import bcrypt from "bcryptjs";


const adminSeeder = async () => {
    // Check if admin user already exists
    const adminExists = await User.findOne({ where: { userEmail: envConfig.adminEmail } })

    if (adminExists) {
        console.log("Admin user already exists");
        return;
    }

    await User.create({
        username: "admin",
        userEmail: envConfig.adminEmail,
        userPassword: bcrypt.hashSync(envConfig.adminPassword as string, 10),
        userRole: "admin"
    })

    console.log("Admin seeded successfully");
}

export default adminSeeder;