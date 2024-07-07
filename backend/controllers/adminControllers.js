import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// @desc    get user by id
// @route   GET /api/admin/:id
// @access  Private

const getUserById = asyncHandler(async (req, res) => {
  
   

     const userDetails=await User.findById(req.params.id)

     if(userDetails){

        res.status(200).json(userDetails)
     }

     else{

        res.status(400)
        throw new Error('no user found')
     }

});




// @desc    get all users
// @route   GET /api/admin/getallusers
// @access  Private

const getAllUsers = asyncHandler(async (req, res) => {
    
   const allUsers=await User.find({})



   if(!allUsers){

    res.status(400)
    throw new Error('no user found')
   }

   else{

      res.status(200).json(allUsers)
   }
  });
  






// @desc    delete user by id
// @route   DELETE /api/admin/:id
// @access  Private

const deleteUserById = asyncHandler(async (req, res) => {
  


    const userDetails=await User.findById(req.params.id)

    if(userDetails){

        if(userDetails.isAdmin){

            res.status(401).send('you cannot perform this task')
        }

        await userDetails.deleteOne({id:userDetails._id})

        res.status(200).send('user Deleted successfully')
    }

    else{

       res.status(400)
       throw new Error('no user found')
    }
});

// @desc    update user by id
// @route   PUT /api/admin/:id
// @access  Private

const updateUserById = asyncHandler(async (req, res) => {
    


    const userDetails=await User.findById(req.params.id)

    if(userDetails){

        
    userDetails.name=req.body.name || userDetails.name
    userDetails.email=req.body.email || userDetails.email
    userDetails.isAdmin=Boolean(req.body.isAdmin)

    const updatedUser=await userDetails.save()

        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }

    else{

       res.status(400)
       throw new Error('no user found')
    }
});

// @desc    update order to be delivered
// @route   PUT /api/admin/orders/:id/delivered
// @access  Private

const updateOrderToDelivered = asyncHandler(async (req, res) => {


  const orderDetails = await Order.findById(req.params.id);

  if (orderDetails) {
    orderDetails.isDelivered = true;
    orderDetails.deliveredAt = Date.now();

    const updatedorder = await orderDetails.save();

    res.status(200).json(updatedorder);
  } else {
    res.status(400);
    throw new Error("no items found");
  }
});

// @desc    get all orders
// @route   GET /api/admin/products
// @access  Private

const getAllOrders = asyncHandler(async (req, res) => {
  const showAllOrders = await Order.find({}).populate("user", "id name email");


  res.status(200).json(showAllOrders);
});

// @desc    add product
// @route   POST /api/admin/products
// @access  Private

const addNewProduct = asyncHandler(async (req, res) => {
 

  const newProduct = new Product({
    name: "sample",
    image:
      "https://st.depositphotos.com/2274151/3518/i/450/depositphotos_35186549-stock-photo-sample-grunge-red-round-stamp.jpg",
    brand: "new brand",
    category: "telephone",
    description: "nhjhjkjklll",
    rating: "5",
    numReviews: "4",
    price: 123,
    countInStock: "2",
    user: req.user._id,
  });

  const createdProduct = await newProduct.save();

  if (!createdProduct) {
    res.status(400);
    throw new Error("product not added");
  } else {
    res.status(200).send(createdProduct);
  }
});

// @desc    editProduct product
// @route   PUT /api/admin/products
// @access  Private

const editProduct = asyncHandler(async (req, res) => {
  

  const products = await Product.findById(req.params.id);

  const { name, price, image, brand, category, countInStock, description } =
    req.body;

 

  if (products) {
    const updatedproduct = await Product.findByIdAndUpdate(req.params.id, {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    });

    await updatedproduct.save();

   

    res.status(200).json(updatedproduct);
  } else {
    res.status(400);
    throw new Error(" editing product failed");
  }
});

// @desc    delete product
// @route   DELETE /api/admin/deleteproducts/:id

const deleteProduct = asyncHandler(async (req, res) => {
  

  const products = await Product.findById(req.params.id);

  if (products) {
    const deletedproduct = await Product.findByIdAndDelete(req.params.id);

    

    res.status(200).json({ message: "product Deleted succesfully" });
  } else {
    res.status(400);
    throw new Error("deleting product failed");
  }
});

export {
  deleteUserById,
  updateUserById,
  updateOrderToDelivered,
  getAllOrders,
  getUserById,
  addNewProduct,
  editProduct,
  deleteProduct,
  getAllUsers,
};
