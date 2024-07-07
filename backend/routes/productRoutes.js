import express from "express";
const router = express.Router();
import { getAllProducts,getSingleProduct,addReview,getTopRatedProducts } from "../controllers/productControllers.js";
import { protect } from "../middleware/authMiddleware.js";



router.route('/top').get(getTopRatedProducts)

router.route('/').get(getAllProducts)

router.route('/:id').get(getSingleProduct)

router.route('/:id/review').post(protect,addReview) 



export default router;
