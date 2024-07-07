import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";



// @desc    get all product
// @route   get /api/products
// @access  Public

const getAllProducts=asyncHandler(async(req, res) => {
    


const keyword=req.query.keyword ? {name:{$regex:req.query.keyword,$options:'i'}} :{};



const pageSize=process.env.PAGINATION_LIMIT;
const page=Number(req.query.pageNumber)|| 1;
const count=await Product.countDocuments({...keyword})

    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))

    res.json({products,page,pages:Math.ceil(count/pageSize)})
})

// @desc    get single product
// @route   get /api/products/:id
// @access  Public


const getSingleProduct=asyncHandler(async(req, res) => {

    const productDetail = await Product.findById(req.params.id)

    if(productDetail){
     return   res.json(productDetail);
    }
   
    res.status(404);
    throw new Error('product not found...')
  
  })



// @desc    add product review
// @route   POST /api/products/:id/review
// @access  Private


const addReview=asyncHandler(async(req, res) => {
    


     const {rating,comment}=req.body

       const product=await Product.findById(req.params.id)

       if(product){

       const  productAlreadyReviewed=   product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())

       if(productAlreadyReviewed){
            res.status(400)
            throw new Error('product already Reviewed')
       }

       const newReview={

          name:req.user.name,
          rating:Number(rating),
          comment,
          user:req.user._id
       }

        product.reviews.push(newReview)

        product.numReviews=product.reviews.length

        product.rating=product.reviews.reduce((acc,curr)=>(acc+curr.rating),0)/product.reviews.length

        await product.save()

        res.status(200).json({message:'review added...'})





       }

       else{

        res.status(400)
        throw new Error('product not found...')
       }


    })




    // @desc    get top rated product
// @route   GET /api/products/top
// @access  Public


const getTopRatedProducts=asyncHandler(async(req, res) => {

   const topProducts=await Product.find({}).sort({rating:-1}).limit(3)

     res.status(200).json(topProducts)
 
 })
    









  export{
     getAllProducts,
     getSingleProduct,
     addReview,
     getTopRatedProducts

  }
