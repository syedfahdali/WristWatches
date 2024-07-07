import express from "express";
const router = express.Router();
import {deleteUserById,deleteProduct,getUserById,updateUserById,getAllOrders,updateOrderToDelivered,addNewProduct,editProduct,getAllUsers } from "../controllers/adminControllers.js";
import { admin,protect } from "../middleware/authMiddleware.js";



router.route('/getallusers').get(getAllUsers)
router.route('/:id').get(protect,admin,getUserById).delete(protect,admin,deleteUserById).put(protect,admin,updateUserById)



router.route('/orders/:id/delivered').put(protect,admin,updateOrderToDelivered)
router.route('/orders/allorders').get(protect,admin,getAllOrders) 

router.route('/products').post(protect,admin,addNewProduct)
router.route('/deleteproducts/:id').delete(protect,admin,deleteProduct)
router.route('/editProducts/:id').put(protect,admin,editProduct)




export default router;
