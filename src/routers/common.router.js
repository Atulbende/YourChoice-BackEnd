import { Router } from "express";
import { auth } from "../middleware/auth.middleware.js";
import {com_delete} from '../controllers/common/common.js'
const router=Router();
router.route('/com_delete').post(auth,com_delete);
export default router;
