import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { com_message, getNewObj } from "../../utils/index.js";
import { APIResponse  } from "../../utils/_response.js";
const getGridServices=_async(async(req,res)=>{
   const ShopId=req?.headers['appid'] || 1;
   const servicesGrid=  await executeQuery('select * from get_grid_services_vw where ShopId=?',[ShopId]);
   console.log('red:',servicesGrid);
if(servicesGrid) return   res.send(new APIResponse(200,"services Grid",{servicesGrid:servicesGrid}));
})
const openService=_async(async(req,res)=>{
   const _id=req?.body?.Pid; 
   if(_id===-1){
   const result = await  executeQuery(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=?  AND COLUMN_NAME NOT IN (?);`,['services','ShopId']);
   res.result=getNewObj(result)
   }else{
   const result = await  executeQuery(`SELECT Pid,ServiceName,Gender,Rate FROM services WHERE Pid=?;`,[_id]);
   res.result=result;
}   
const requiredfields = await  executeQuery(`select FieldsArray from requiredfields where TableName=?;`,['services']);
res.required=JSON.parse(requiredfields[0].FieldsArray.replace(/'/g, '"'));
return res.send(new APIResponse(200,"loaded",{result:res.result,required:res.required}));
})
 const ServiceSave=_async(async(req,res)=>{
try {
      const formData= req?.body;
      const shopId=req?.headers['appid'];
       const result = await  executeQuery('call SP_ServiceSave(?,?,@Per_Result);',[JSON.stringify(formData),shopId]);
       const _msg =com_message(result[0].Per_Result);
      return res.send(new APIResponse(200,"done",{result:_msg}));
} catch (error) {
   console.log('_error',req?.headers['appid'])
}
 })
export {ServiceSave,openService,getGridServices}