import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { ApiError } from "../../utils/_error.js";
import { APIResponse  } from "../../utils/_response.js";
const com_delete=_async(async(req,res)=>{
        try {
                let id=req.body.id.toString();
                const result=await executeQuery(`call ${req.body.activity}(?, ?,@Per_Result)`,[id,req.body.table]);
                console.log('result:',result[0]);
                return res.send(new APIResponse(200,"loaded",{result:result[0]?.Per_Result}));
        } catch (error) {
                console.log('com_delete::',error);        
        }       
})
export {com_delete};
