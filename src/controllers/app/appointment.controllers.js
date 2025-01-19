import executeQuery from "../../database/query.js";
import { _async } from "../../utils/_async.js";
import { com_message, getNewObj,createListItems } from "../../utils/index.js";
import { APIResponse  } from "../../utils/_response.js";
import { cp } from "fs";
const getGridAppointments=_async(async(req,res)=>{
   const ShopId=req?.headers['appid'] || 1;
   const appointmentListGrid= await executeQuery('select * from get_grid_appointments_vw where ShopId=?',[ShopId]);
   return   res.send(new APIResponse(200,"Appointments Grid",{appointmentsGrid:appointmentListGrid}));
});
const getGridAppointmentLists=_async(async(req,res)=>{
   const ShopId=req?.headers['appid'] || 1;
   console.log("req:",req?.query?.AppointmentNo);
   const appointmentsGrid= await executeQuery('select * from get_grid_appointmentlists_vw where ShopId=? and AppointmentNo=?',[ShopId,req?.query?.AppointmentNo]);
   return   res.send(new APIResponse(200,"appointments List Grid",{appointmentListsGrid:appointmentsGrid}));
});
const openAppointment=_async(async(req,res)=>{
   const _id=req?.body?.Pid; 
   const ShopId=req?.headers['appid'] || 1;
   if(_id===-1){
   const result = await  executeQuery(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME=?  AND COLUMN_NAME NOT IN (?);`,['appointments','ShopId']);
   const APNo = await  executeQuery(`SELECT AppointmentNo FROM config where ShopId=?`,[ShopId]);
   res.result=getNewObj(result);
   res.result[0].VisitDate=new Date();
   console.log('p:::', res.result[0].AppointmentNo)
   res.result[0].AppointmentNo=Number(APNo[0].AppointmentNo)+1;
   }else{
   const result = await  executeQuery(`SELECT * FROM get_grid_appointments_vw WHERE Pid=?;`,[_id]);
   res.result=result;
}   
const requiredfields = await  executeQuery(`select FieldsArray from requiredfields where TableName=?;`,['appointments']);
res.required=JSON.parse(requiredfields[0].FieldsArray.replace(/'/g, '"'));
return res.send(new APIResponse(200,"loaded",{result:res.result,required:res.required}));
});
const getClientInfo=_async(async(req,res)=>{
   const ClientInfo = await  executeQuery(`SELECT * FROM customers where MobileNo=?`,[req?.body?.data]);
   res.result=ClientInfo;
   return res.send(new APIResponse(200,"getClientInfo",{result:res.result})); 
})
const getEmployeeList=_async(async(req,res)=>{
   const shopId=req?.headers['appid'];
   const EmployeeName = await  executeQuery(`SELECT Pid,EmployeeName FROM employees where ShopId=?`,[shopId]);
   res.result=createListItems(EmployeeName,'EmployeeName');
   
   return res.send(new APIResponse(200,"getEmployeeList",{result:res.result})); 
});
const getServiceList=_async(async(req,res)=>{
   const shopId=req?.headers['appid'];
   const ServiceName = await  executeQuery(`SELECT Pid,concat(ServiceName,' - ',Gender,' - ',Rate) AS ServiceName FROM services where ShopId=?`,[shopId]);
   res.result=createListItems(ServiceName,'ServiceName');
   return res.send(new APIResponse(200,"getServiceNameList",{result:res.result})); 
});



const appointmentSave=_async(async(req,res)=>{
   try {
         const formData= req?.body;
         const shopId=req?.headers['appid'];
         let var_ClientId;
         const {Pid,AppointmentNo,ClientId,VisitDate,isDelete,}=formData;
         var_ClientId=ClientId;
         const {MobileNo,ClientName,Email,Gender,DateOfBirth,LastVisitDate}=formData;

         if(ClientId==-1){
            const CPid = await  executeQuery('call SP_CustomerSave(?,?,@Per_Pid,@Per_Result);',[JSON.stringify(
                {
                  Pid: '-1',
                  MobileNo: MobileNo,
                  CustomerName: ClientName,
                  Email: Email,
                  Gender:Gender,
                  DateOfBirth:DateOfBirth,
                  LastVisitDate: LastVisitDate?LastVisitDate:new Date(),
                  Status:'Active'
                }
            ),shopId]);

            var_ClientId=CPid[0]?.Per_Pid;
         }

         const var_VisitDate=new Date(VisitDate).toISOString().slice(0,19).replace('T',' ')
         const result = await  executeQuery('call SP_AppointmentsSave(?,?,?,?,?,?,@Per_Result);',[Pid,AppointmentNo,var_VisitDate,var_ClientId,shopId,isDelete]);
         
         const _msg =com_message(result[0].Per_Result);

         return res.send(new APIResponse(200,"done",{result:_msg}));
   } catch (error) {
      console.log('_error',error)
   }
    });
 const appointmentListsSave=_async(async(req,res)=>{
try {
      const formData= req?.body;
      const shopId=req?.headers['appid'];
      console.log('formData:',JSON.stringify(formData));

      const result = await  executeQuery('call SP_AppointmentListSave(?,?,@Per_Result);',[JSON.stringify(formData),shopId]);
      const _msg =com_message(result[0].Per_Result);
      return res.send(new APIResponse(200,"done",{result:_msg}));
} catch (error) {
   console.log('_error',error)
}
 })
// export {appointmentsave,openAppointment,getGridappointments}
export { 
         getGridAppointments,
         getGridAppointmentLists,
         openAppointment,
         getClientInfo,
         getEmployeeList,
         getServiceList,
         appointmentListsSave,
         appointmentSave
      }