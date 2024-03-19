import  executeQuery  from "../database/query.js";
import { JWTServices } from "../services/JWTServices.js";
import { _async } from "../utils/_async.js";
import { ApiError } from "../utils/_error.js";
import { CookiesOptions } from '../config/cookiesConfig.js';

 const auth=_async(async(req,res,next)=>{
        const token=req?.cookies?._sessionId || req?.headers?.Authorization.split(' ')[1];
        const refreshToken = req?.cookies?._sessionRId;
        const user = await JWTServices.verifyAccessToken(token)
        const Rid = await JWTServices.verifyRefreshToken(refreshToken)
        if(!Rid){
            res.clearCookie('_sessionId',CookiesOptions).clearCookie('_sessionRId',CookiesOptions)
            return   res.status(405).json(new ApiError(405,false,`Refresh Token Expired`));
        }
        if(!!user?.data?.userId){
            const result= await executeQuery('call authCheck(?,@Per_Status);',[user?.data?.userId]);
            const varStatus=result[0]?.Per_Status;
            if(!!varStatus){
                    req.userId=user?.data?.userId;
                    next(); 
            }else{
                return   res.send (new ApiError(404,false,`Token Expired`));
            }
    }else{
        return   res.status(404).json(new ApiError(404,false,`Token Expired `))
    }
    // } catch (error) {
    //     console.log('error:',error);
    //     return   res.status(404).json(new ApiError(404,false,`Token Expired `))
    // }
})

export {auth}