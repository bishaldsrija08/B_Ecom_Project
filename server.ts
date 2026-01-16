// Import the Express application
import adminSeeder from "./src/adminSeeder";
import app from "./src/app";

// Import environment configuration
import { envConfig } from "./src/config/config";
import CategoryController from "./src/controllers/categoryController";

// Import and invoke the connectDB function to establish database connection
import { connectDB } from "./src/database/connection";
connectDB();

// Socket io
import { Server } from "socket.io";

// import jwt
import jwt from "jsonwebtoken";
import User from "./src/database/models/userModel";
import { UserRole } from "./src/middlewares/isAuthenticate";

// Start the server
function startServer() {
    const port = envConfig.port
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
        adminSeeder()
        CategoryController.seedCategories()
    })

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    })

    interface IOnlineUsers {
        socketId: string,
        userId: string,
        role: UserRole
    }

    let onlineUsers: IOnlineUsers[] = [];
    let addToOnlineUsers = (socketId: string, userId: string, role: UserRole) => {
        onlineUsers = onlineUsers.filter((user) => user.userId !== userId)
        onlineUsers.push({ socketId, userId, role })
    }

    io.on("connection", (socket) => {
        const { token } = socket.handshake.auth
        if (token) {
            jwt.verify(token, envConfig.jwtSecret as string, async (err: any, decoded: any) => {
                if (err) {
                    socket.emit("unauthorized", err)
                    console.log("Socket authentication failed");
                } else {
                    const userId = decoded.userId
                    const userData = await User.findByPk(userId)
                    if (!userData) {
                        socket.emit("unauthorized", "User not found")
                        return
                    }

                    // Grab user id
                    addToOnlineUsers(socket.id, userId, userData.userRole as UserRole)

                }
            })
        }

    })
}
startServer();