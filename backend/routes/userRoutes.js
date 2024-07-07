import express from "express";
const router = express.Router();
import {authUser,getUserProfile,logoutUser,registerUser,updateUserProfile  } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";



router.route('/login').post(authUser)

router.route('/').post(registerUser)   

router.route('/logout').post(logoutUser) 

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)





export default router;
