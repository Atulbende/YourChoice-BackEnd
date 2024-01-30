import express from "express"
import cors from "cors"

import cookieParser from "cookie-parser"
const app = express()
app.use(cors({ 
    origin: "*",
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
// Administration Routers
import userRouters from "./routers/user.router.js"
app.use('/api/v1/user',userRouters);
export { app }