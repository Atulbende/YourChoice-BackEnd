import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import { appointmentSave,getGridAppointments,openAppointment,getClientInfo,getEmployeeList,getServiceList,getGridAppointmentLists,appointmentListsSave} from "../../controllers/app/appointment.controllers.js";
const router=Router();
router.route('/getGridAppointments').get(auth,getGridAppointments);
router.route('/openAppointment').post(auth,openAppointment);
router.route('/getClientInfo').post(auth,getClientInfo);
router.route('/getEmployeeList').post(auth,getEmployeeList);
router.route('/getServiceList').post(auth,getServiceList);
router.route('/getGridAppointmentLists').get(auth,getGridAppointmentLists);
router.route('/appointmentListsSave').post(auth,appointmentListsSave);
router.route('/appointmentSave').post(auth,appointmentSave);
export default router;