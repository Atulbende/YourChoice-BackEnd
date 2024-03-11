import {_async} from '../../utils/_async.js'
import executeQuery  from '../../database/query.js';
import bcrypt from 'bcrypt';
import {ApiError} from '../../utils/_error.js'
import {APIResponse} from '../../utils/_response.js'
import {JWTServices}  from '../../services/JWTServices.js';
import { CookiesOptions } from '../../config/cookiesConfig.js';
// Sample Request Data
// Signup_Email: 'atul.bende@gmail.co',
// Signup_UserName: 'atul400',
// Signup_Password: 'Atul@410'

// User SignUp
const userSinghUp = _async(async(req,res)=>{    
    try {
        const _Login_Password=req.body?.Signup_Password.toString();
                    bcrypt.hash(_Login_Password,10,async(err,hashPassword)=>{
                        if(!!hashPassword){
                            setTimeout(async()=>{
                            const result = await  executeQuery('call SignupSave(?,?,?,@Per_Result);',[req.body.Signup_Email,req.body.Signup_UserName,hashPassword])
                            if(result[0].Per_Result=='-1'){
                                res.send (new ApiError(404,'data',"Record not found",false,result[0].Per_Result));
                            }else if(result[0].Per_Result=='1'){
                                res.send (new APIResponse(200,"Singup successfully please contact admin"));
                            }
                        },2300);
                        }else{
                            // return APIError();
                            res.send (new ApiError(404,'data',err,false,result[0].Per_Result));
                                
                        }   
                    
                    });
        } catch (error) {
            res.send( new ApiError(409,error));
        }
           });
        //Check user Name and password
const userLogin = _async(async(req,res)=>{
        try {
        //Getting User Data from database using SP,
        const result = await  executeQuery('call LoginCheck(?,@Per_Password,@Per_Roles,@Per_Status,@Per_UserId,@Per_RefreshToken);',[req.body.loginUserName]);
        // stroing statubs,id role encrypted password string 
        const varStatus=result[0]?.Per_Status;
        const varUserId=result[0]?.Per_UserId;
        const varRoles=result[0]?.Per_Roles;
        const varPassword=req.body?.loginPassword;
        const resPassword=result[0]?.Per_Password;
        const curRefreshTokon=result[0]?.Per_RefreshToken;
        const RefreshToken = req.cookies?._sessionRId;
        // If user not found then return  402
        if(resPassword==='-1' || !resPassword)  return res.send (new ApiError(402,false,"User Not Register"));
        // If user not Active then return 402
        if(varStatus!=='Active') return   res.send (new ApiError(402,false,"User Not Active Please Contact Admin"));
        // Compire password encrypted passowrd    
        bcrypt.compare(varPassword,resPassword,async(err,hashPassword)=>{
            // If password succussfull compire and status is active then create token 
                  if(hashPassword && varStatus==='Active'){
                    // Check refresh Token and AccessToken
                     if(!!req.cookies?._sessionRId && req.cookies?._sessionRId === curRefreshTokon){
                        // console.log('Token:',req.cookie?._sessionRId,curRefreshTokon)
                        console.log('::::::1')
                        const accessToken= await JWTServices.generateAccessToken({userId:varUserId,userName:req.body.loginUserName});
                        res.cookie('_sessionId',accessToken,CookiesOptions)
                        // return [accessToken];
                        return   res.send(new APIResponse(200,"Login Succussfully!",{Roles:varRoles,accessTokenId:accessToken}));
        
                     }else{
                       const [accessToken,refreshToken]=  await JWTServices.generateRefreshAccessToken({userId:varUserId,userName:req.body.loginUserName});
                       res.cookie('_sessionId',accessToken,CookiesOptions)
                       res.cookie('_sessionRId',refreshToken,CookiesOptions)
                       const getRefreshResponse = await  executeQuery('call UserRefreshTokenUpdate(?,?,@Per_Result);',[varUserId,refreshToken]);
                       return   res.send(new APIResponse(200,"Login Succussfully!",{Roles:varRoles,accessTokenId:accessToken}));
                    //    return [accessToken,refreshToken];
                     }
                //    const [accessToken,refreshToken]=await JWTServices.generateRefreshAccessToken(req.body.loginUserName);
                    // Store refresh Token in user database 
                     // if Refresh Token is store successfully then return 200 and return role m Access token   
                //    if(getRefreshResponse[0]?.Per_Result==="200"){
                //       }else{
                //       }
                    // if password not correct
                  }else{
                    return   res.send (new ApiError(402,false,"Please Enter Correct Password"));
                  }
                    
                });
        } catch (error) {
            res.send( new ApiError(409,error));
            
        }
           
});

const userLogOut =_async(async(req,res)=>{       
      const result=await  executeQuery('call logout(?,@Per_isLogout)',[req?.userId]);
        console.log('q:',result);
        if(result[0].Per_isLogout){
          res.clearCookie('_sessionId',CookiesOptions).clearCookie('_sessionRId',CookiesOptions)
         .send (new APIResponse(204,"Logout successfully"));
        }else{
        res.send (new APIResponse(204,"user not Exists"));   
        }
});
export {userSinghUp,userLogin,userLogOut}