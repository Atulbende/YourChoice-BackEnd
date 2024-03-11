import { Router } from "express";
import { keywords } from "../../controllers/app/keyword.controller.js";
import { auth } from "../../middleware/auth.middleware.js";

const router=Router();

router.route('/keywords').post(auth,keywords)
export default router;
