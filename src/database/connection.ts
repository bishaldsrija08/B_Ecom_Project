import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";

if (!envConfig.databaseUrl) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

const sequelize = new Sequelize(envConfig.databaseUrl, {
    models: [__dirname + '/models']
})

export const connectDB = async () => {
    try {
        await sequelize.authenticate()
            .then(() => {
                console.log("Database connected successfully.");
            // Relatinshipf file here
            require("./modelRelationships")
               
            })
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    sequelize.sync({ alter: false }).then(() => {
        console.log("All models were synchronized successfully.")
    })
}

export default sequelize; 