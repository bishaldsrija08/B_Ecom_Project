// All the model relationships are defined in this file

import Product from "./models/productMode";
import Category from "./models/categoryModel";
import User from "./models/userModel";
import Order from "./models/orderMode";
import Payment from "./models/paymentModel";
import OrderDetails from "./models/orderDetailsModel";

// Relationships between prodcts and categories 
Product.belongsTo(Category, { foreignKey: "categoryId" }) // Product table ma categoryId foreign key cha
Category.hasOne(Product, { foreignKey: "categoryId" })

// Relationship betewen User and Orders
Order.belongsTo(User, { foreignKey: "userId" }) // Order table ma userId foreign key cha
User.hasMany(Order, { foreignKey: "userId" })

// Realtionship between payment and order
Payment.belongsTo(Order, { foreignKey: "orderId" }) // Payment table ma orderId foreign key cha
Order.hasOne(Payment, { foreignKey: "orderId" })

// Relationship between order detail and order
OrderDetails.belongsTo(Order, { foreignKey: "orderId" }) // OrderDetails table ma orderId foreign key cha
Order.hasMany(OrderDetails, { foreignKey: "orderId" })

// Relationship between order detail and product
OrderDetails.belongsTo(Product, { foreignKey: "productId" }) // OrderDetails table ma productId foreign key cha
Product.hasMany(OrderDetails, { foreignKey: "productId" })