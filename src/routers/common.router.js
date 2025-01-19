import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import {com_delete,getAppointmentNo} from '../controllers/common/common.js'
const router=Router();
router.route('/com_delete').post(auth,com_delete);
router.route('/getAppointmentNo').get(auth,getAppointmentNo);
export default router;
