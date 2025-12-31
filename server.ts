// Import the Express application
import app from "./src/app";

// Import environment configuration
import { envConfig } from "./src/config/config";

// Import and invoke the connectDB function to establish database connection
import { connectDB } from "./src/database/connection";
connectDB();

// Start the server
function startServer() {
    const port = envConfig.port
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    })
}
startServer();