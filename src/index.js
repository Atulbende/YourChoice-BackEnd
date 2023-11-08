import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import bcrypt   from'bcrypt';
import database  from './database/index.js';
const app= express();
app.use(express.json());
// app.use(cors());
database().then(()=>{
    app.listen(process.env.PORT || 3000,()=>{   
        console.log('Connected');
    });
}).catch((err)=>{
    console.log('MYSQL DB NOT CONNECTED! ',err)
});