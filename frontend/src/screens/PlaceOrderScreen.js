import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useCreateOrderMutation } from "../redux/slices/orderApiSlice";
import {clearCart} from '../redux/slices/cartSlice'

const PlaceOrderScreen = () => {
  const { shippingAddress, paymentMethod,cartItems,itemsPrice,shippingPrice,taxPrice,totalprice} = useSelector((state) => state.cart);
  const { address, city, postalCode, country } = shippingAddress;


  const navigate = useNavigate();
   const dispatch=useDispatch()
   
   const [ createOrder,{isLoading,isError}]=useCreateOrderMutation()


  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment-method");
    }
  }, [navigate, shippingAddress, paymentMethod]);


const placeOrder=async(e)=>{

    e.preventDefault()
    console.log('placeorder')

    try{

        const res=await createOrder({
           orderItems:cartItems,
           shippingAddress:shippingAddress,
           paymentMethod:paymentMethod,
           itemsPrice:itemsPrice,
           taxPrice:taxPrice,
           shippingPrice:shippingPrice,
           totalprice:totalprice

        }).unwrap()

      

     



        navigate(`/order-Details/${res._id}`)


    }

    catch(err){

      console.log(err)
    }
    
}




  return (
    <div>
      <CheckoutSteps
        step1={"step1"}
        step2={"step1"}
        step3={"step1"}
        step4={"step1"}
      />

      <Row>
      
        <Col md={8} xs={12} className="text-center">
          <div className="shipping border-bottom p-5">
            <h2 className="mb-5 text-warning">Shipping</h2>
            <h5 className="text-white fw-bold">
              Address :{`    ${address} ${city} ${postalCode} ${country}`}{" "}
            </h5>
          </div>

          <div className="payment border-bottom p-5">
            <h2 className="mb-5 text-warning">Payment Method</h2>
            <h5 className="text-white fw-bold">Method :{paymentMethod} </h5>
          </div>

          <div className="OrderItems border-bottom p-5">
            <h2 className="mb-5 text-warning">Order Items</h2>

            <Container>
            {

             cartItems.map((x)=>(
          
          
              <Row key={x.name}>
                <Col md={2} xs={2}>
                
                 <img src={x.image} style={{height:'40px'}}/>
                
                </Col>

                <Col md={4} xs={5} className="orderBoxName ms-1">{x.name}</Col>

                <Col md={1} xs={1}></Col>

                <Col md={4} xs={3} className="orderBoxQty">{`${x.qty} x ${x.price}=`} <span>₹{x.price*x.qty}</span></Col>
              </Row>
                    
             ))
            }
            </Container>
          </div>
        </Col>

        <Col md={3} xs={12} className=" mx-auto my-auto ms-5 text-center">

    
    <ListGroup className="p-3 text-white showOrderBox">
      <ListGroup.Item className="p-3 border">Items : ₹{itemsPrice} </ListGroup.Item>
      <ListGroup.Item className="p-3 border">Shipping Price : ₹{shippingPrice}</ListGroup.Item>
      <ListGroup.Item className="p-3 border">Tax Price : ₹{taxPrice}</ListGroup.Item>
      <ListGroup.Item className="p-3 border text-warning">Total Price :₹{totalprice}</ListGroup.Item>
      <ListGroup.Item className="p-3 border text-warning"><Button variant="primary" onClick={placeOrder}>Place Order</Button></ListGroup.Item>
    
    </ListGroup>

        </Col>

        <Col md={1}></Col>
        
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
