import { Router } from "express";
import { userAuthentication,userSinghUp } from "../controllers/user/user.controller.js";

const router=Router();
router.route('/login').post(userAuthentication) ;
router.route('/singup').post(userSinghUp) ;

export default router;