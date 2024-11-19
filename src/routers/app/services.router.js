import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import {ServiceSave,getGridServices,openService} from '../../controllers/app/service.controllers.js';
const router=Router();
router.route('/serviceSave').post(ServiceSave);
router.route('/getGridServices').get(getGridServices);
router.route('/openService').post(openService);
export default router;