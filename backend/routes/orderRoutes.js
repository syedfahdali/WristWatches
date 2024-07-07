import express from "express";
const router = express.Router();
import {createNewOrder,getMyOrders,getMyOrdersById,updateMyOrdersDetailsById, } from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";





router.route('/').post(protect,createNewOrder) 

router.route('/myorders').get(protect,getMyOrders)  



router.route('/:id/orderDetails').put(protect,updateMyOrdersDetailsById) .get(protect,getMyOrdersById)

export default router;
