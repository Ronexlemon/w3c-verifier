import express from "express";
import didRouter from "./routes/did_web"

const App =  express();
const PORT = 3000;
App.use(express.json());
App.use("/api/v1/did",didRouter)

App.listen(PORT,()=>{
    console.log("Server is running on port ........ 3000");

})