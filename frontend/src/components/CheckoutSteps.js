import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CheckoutSteps = ({step1,step2,step3,step4}) => {
  return (
    <Row style={{marginBottom:'70px' }}>

  

      <Col md={12} xs={11}>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: "100px"}}
        navbarScroll
      >

<div className="checkoutTabs mx-auto">

      <div className="ms-4">
      {
        step1 ? <Link to={'/login'} style={{textDecoration:'none'}}>Login</Link> : <Link to={'/login'} style={{textDecoration:'none'}} className="text-white">Login</Link> 
      }
      </div>

      <div className="ms-5">
      {
        step2 ? <Link to={'/shipping'} style={{textDecoration:'none'}}>Shipping</Link> : <Link to={'/shipping'} style={{textDecoration:'none'}} className="text-white">Shipping</Link> 
      }
      </div>
        

      <div className="ms-5">
      {
        step3 ? <Link to={'/payment-method'} style={{textDecoration:'none'}}>Payment</Link> : <Link to={'/payment-method'} style={{textDecoration:'none'}} className="text-white">Payment</Link> 
      }
      </div>


      <div className="ms-5">
      {
        step4 ? <Link to={'/place-order'} style={{textDecoration:'none'}}>Place Order</Link> : <Link to={'/place-order'} style={{textDecoration:'none'}} className="text-white">Place Order</Link> 
      }
      </div>

      </div>

       
      </Nav>
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
