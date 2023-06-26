
const express =require('express');
const mysql = require('mysql');
const cors= require('cors');
const app= express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'SAVtech',
        database:'dashboard'
});
    app.post('/signup',(req,res)=>{
        // console.log([JSON.stringify(req.body)]);
    db.query(`call SignupSave(?,?,?,@Per_Result)`,[req.body.Signup_Email,req.body.Signup_UserName,req.body.Signup_Password],(error,result)=>{    
        if(error===null){res.send(result[0][0].Per_Result);}else {res.send("Access denied");}
     });
    })
app.listen(3001,()=>{
    console.log('Connect');
});