import express from "express";
import cors from "cors";
import { CookiesOptions } from "./config/cookiesConfig.js";
import cookieParser from "cookie-parser";
const app = express();
const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true // Enable credentials (cookies, authorization headers, etc)
};
app.use(cors(corsOptions));
app.use(cookieParser(CookiesOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Administration Routers
import userRouters from "./routers/user.router.js"
import appKeywordRouters from './routers/app/keyword.router.js'
import commonRouters from './routers/common.router.js'
app.use('/api/v1/user',userRouters);
app.use('/api/v1/app',appKeywordRouters);
app.use('/api/v1/common',commonRouters)
export { app }