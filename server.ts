
import app from "./src/app.js";
import { envConfig } from "./src/config/confit.js";


app.get("/", (req, res)=>{
    res.send("Hello World!")
})




function startServer() {
    const port = envConfig.port
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    })
}
startServer();