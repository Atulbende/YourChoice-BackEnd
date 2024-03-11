import { Router } from "express";
import { userLogin,userSinghUp,userLogOut } from "../controllers/user/user.controller.js";
import {auth} from '../middleware/auth.middleware.js'

const router=Router();
router.route('/login').post(userLogin) ;
router.route('/logout').post(auth,userLogOut) ;
router.route('/singup').post(userSinghUp) ;

export default router;