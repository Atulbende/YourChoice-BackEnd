import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { ApiError } from "../../utils/_error.js";
import { APIResponse  } from "../../utils/_response.js";
const com_delete=_async(async(req,res)=>{
        try {
                let id=req.body.id.toString();
                const result=await executeQuery(`call ${req.body.activity}(?, ?,@Per_Result)`,[id,req.body.table]);
                return res.send(new APIResponse(200,"loaded",{result:result[0]?.Per_Result}));
        } catch (error) {
                console.log('com_delete::',error);        
        }       
})
const getAppointmentNo=_async(async(req,res)=>{
                        try{
                                const result=await executeQuery('select AppointmentNo from config');    
                                const NewApNo=Number(result[0]?.AppointmentNo + 1);
                                return res.send(new APIResponse(200,'AppointmentNo',{result:NewApNo}))     
                        }catch(error){
                                console.log('getAppointmentNo:',error)   
                        }
})
export {com_delete,getAppointmentNo};
