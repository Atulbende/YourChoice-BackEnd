import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { ApiError } from "../../utils/_error.js";
import { APIResponse  } from "../../utils/_response.js";

const keywords=_async(async(req,res)=>{
        // console.log('keywords:',req.cookies);
        // const Token= req.cookies?._sessionId;
        // console.log('Token:',Token)
        try {
                const keywords=  await executeQuery('select * from keywords');
                console.log('keywords:',keywords);
                return   res.send(new APIResponse(200,"Login Succussfully!",{data:keywords}));
        } catch (error) {
                return res.send(new ApiError(200,'Somthing went Wrong'))
        }

})
export {keywords};
