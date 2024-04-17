import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { com_message, getNewObj } from "../../utils/index.js";
import { APIResponse  } from "../../utils/_response.js";
const getGridCustomers=_async(async(req,res)=>{
   const ShopId=req?.headers['appid'] || 1;
   const customersGrid=  await executeQuery('select * from get_grid_customers_vw where ShopId=?',[ShopId]);
   return   res.send(new APIResponse(200,"Customers Grid",{customersGrid:customersGrid}));
})
const openCustomer=_async(async(req,res)=>{
   const _id=req?.body?.Pid; 
   if(_id===-1){
   const result = await  executeQuery(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=?  AND COLUMN_NAME NOT IN (?);`,['customers','ShopId']);
   res.result=getNewObj(result)
   }else{
   const result = await  executeQuery(`SELECT Pid,CustomerName,MobileNo,Email,Gender,DateOfBirth,LastVisit,Status FROM customers WHERE Pid=?;`,[_id]);
   res.result=result;
}   
const requiredfields = await  executeQuery(`select FieldsArray from requiredfields where TableName=?;`,['customers']);
res.required=JSON.parse(requiredfields[0].FieldsArray.replace(/'/g, '"'));
return res.send(new APIResponse(200,"loaded",{result:res.result,required:res.required}));
})
 const CustomerSave=_async(async(req,res)=>{
try {
   console.log('PP:',req,req?.headers['appid'])
      const formData= req?.body;
      const shopId=req?.headers['appid'];
      console.log('formData:',JSON.stringify(formData),shopId)
      const result = await  executeQuery('call SP_CustomerSave(?,?,@Per_Result);',[JSON.stringify(formData),shopId]);
      console.log('result:',result);
      const _msg =com_message(result[0].Per_Result);
      return res.send(new APIResponse(200,"done",{result:_msg}));
} catch (error) {
   console.log('_error',req?.headers['appid'])
}
 })
export {CustomerSave,openCustomer,getGridCustomers}