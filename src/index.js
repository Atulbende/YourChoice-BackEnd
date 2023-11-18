import dotenv from 'dotenv'
import {app} from './app.js'
import database  from './database/index.js';
dotenv.config({path:'./env'});
database().then((res)=>{
    console.log('dd:',res)
    app.listen(process.env.PORT || 3000,()=>{   
        console.log('Connected');
    });
}).catch((err)=>{
    console.log('MYSQL DB NOT CONNECTED! ',err)
});