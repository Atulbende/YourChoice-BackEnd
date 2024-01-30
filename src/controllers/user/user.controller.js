import {_async} from '../../utils/_async.js'
import query  from '../../database/query.js';
import bcrypt from 'bcrypt';
const userSinghUp = _async(async(req,res)=>{
        const _Login_Password=req.body.password.toString();
            bcrypt.hash(_Login_Password,10,async(err,hashPassword)=>{
                // console.log('invalidate:',err,invalidate);            
            // res.send(invalidate);
            if(!!hashPassword){
            const result = await  query('call SignupSave(?,?,?,@Per_Result);',[req.body.email,req.body.username,hashPassword])
            console.log(result)    
            res.send(result)
                }else{
                res.send(err)
            }   

            });
           });
    const userAuthentication = _async(async(req,res)=>{
        console.log('req:::',req,res);
       
        setTimeout(()=>{
            res.send('by');

        },1600000)
            // const _Login_Password=req.body.password.toString();
            //     bcrypt.hash(_Login_Password,10,async(err,hashPassword)=>{
            //         // console.log('invalidate:',err,invalidate);            
            //     // res.send(invalidate);
            //     if(!!hashPassword){
            //     const result = await  query('call SignupSave(?,?,?,@Per_Result);',[req.body.email,req.body.username,hashPassword])
            //     console.log(result)    
            //         res.send(result)
            //         }else{
            //         res.send(err)
            //     }   
    
            //     });
               });
export {userSinghUp,userAuthentication}