import  executeQuery  from "../database/query.js";
import { JWTServices } from "../services/JWTServices.js";
import { _async } from "../utils/_async.js";
import { ApiError } from "../utils/_error.js";

 const auth=_async(async(req,res,next)=>{
    try {
        const token=req?.cookies?._sessionId || req?.headers?.Authorization.split(' ')[1];
        const user = await JWTServices.verifyAccessToken(token)
        // console.log('user:',);
    if(!!user?.data?.userId){
            const result= await executeQuery('call authCheck(?,@Per_Status);',[user?.data?.userId]);
            console.log(result);
            const varStatus=result[0]?.Per_Status;
            if(!!varStatus){
                    req.userId=user?.data?.userId;
                    next(); 
            }else{
                return   res.send (new ApiError(401,false,`Unauthorized  User`));
            }
    }
    } catch (error) {
        console.log('error:',error)
        return   res.send (new ApiError(403,false,`Token Expired `));
        
    }
})

export {auth}