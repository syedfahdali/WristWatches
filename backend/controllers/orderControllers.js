import Orders from "../models/orderModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    create new order
// @route   POST /api/orders
// @access  Private

const createNewOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalprice,
  } = req.body;



  if (!orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no items found");
  } else {
    const order = new Order({
     
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),

      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice:totalprice
      
    });

    const newOrder = await order.save();
   

    res.status(201).json(newOrder);
  }
});

// @desc    get my orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyOrders = asyncHandler(async (req, res) => {

 

  const myOrder = await Order.find({ user: req.user._id });

  if (myOrder.length === 0) {
    res.status(200).send(" no items ordered");
  } else {
    res.status(200).json(myOrder);
  }
});

// @desc    get orders by Id
// @route   GET /api/orders/:id
// @access  Private

const getMyOrdersById = asyncHandler(async (req, res) => {



  const orderDetails =  await Order.findById(req.params.id);
 


  if (orderDetails.length === 0) {
    throw new Error('no order found')
    
  } else {
    
    res.status(200).json(orderDetails);
  }
});

// @desc    update order to paid
// @route   PUT /api/orders/:id/orderDetails
// @access  Private

const updateMyOrdersDetailsById = asyncHandler(async (req, res) => {



  const OrderDetails = await Order.findById(req.params.id);

  if (OrderDetails) {

     OrderDetails.isPaid=true,
     OrderDetails.paidAt=Date.now(),

     OrderDetails.paymentResult={

         id:req.body.id,
         status:req.body.status,
         update_time:req.body.update_time,
         email_address:req.body.payer.email_address
     }

     const updatedOrder=await OrderDetails.save()

     res.status(200).json(updatedOrder)
  }
 
 else {

    res.status(400)
    throw new Error('order not found')
  }



});

export {
  createNewOrder,
  getMyOrders,
  getMyOrdersById,
  updateMyOrdersDetailsById,
};
