import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import Product from "./models/productMode";
import Category from "./models/categoryModel";
import User from "./models/userModel";
import Order from "./models/orderMode";
import Payment from "./models/paymentModel";
import OrderDetails from "./models/orderDetailsModel";

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

                // Relationships between prodcts and categories 
                Product.belongsTo(Category, { foreignKey: "categoryId" }) // Product table ma categoryId foreign key cha
                Category.hasOne(Product, { foreignKey: "categoryId" })

                // Relationship betewen User and Orders
                Order.belongsTo(User, {foreignKey: "userId"}) // Order table ma userId foreign key cha
                User.hasMany(Order, {foreignKey: "userId"})

                // Realtionship between payment and order
                Payment.belongsTo(Order, {foreignKey: "orderId"}) // Payment table ma orderId foreign key cha
                Order.hasOne(Payment, {foreignKey: "orderId"})

                // Relationship between order detail and order
                OrderDetails.belongsTo(Order, {foreignKey: "orderId"}) // OrderDetails table ma orderId foreign key cha
                Order.hasMany(OrderDetails, {foreignKey: "orderId"})

                // Relationship between order detail and product
                OrderDetails.belongsTo(Product, {foreignKey: "productId"}) // OrderDetails table ma productId foreign key cha
                Product.hasMany(OrderDetails, {foreignKey: "productId"})

            })
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    sequelize.sync({ alter: false }).then(() => {
        console.log("All models were synchronized successfully.")
    })
}

export default sequelize; 