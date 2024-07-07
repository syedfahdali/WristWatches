import React, { useState } from "react";
import { Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import { FaTrash } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.login);

  const addTocartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const deleteCartItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const { cartItems } = cart;

  const cartCount = cartItems.reduce((acc, curr) => acc + Number(curr.qty), 0);
  const cartTotalPrice = cartItems.reduce(
    (acc, curr) => acc + Number(curr.price) * Number(curr.qty),
    0
  );

  console.log("count", cartCount);

  const checkoutHandler = () => {
    if(userInfo!==null){

       navigate('/shipping')
    }

    else {

      navigate('/login')
    }
  };

  return (
    <div>
      <Container>
        {cartItems.length === 0 ? (
          <Message variant={"danger"}>No items in cart </Message>
        ) : (
          <Row>
            <h2 className="mb-5 cartHead">Shopping Cart</h2>

            {cartItems.map((items, idx) => (
              <Col
                key={items.price}
                lg={7}
                md={7}
                xs={12}
                className="mt-4"
                style={{ marginTop: "150px" }}
              >
                <Row className="text-center">
                  <Col md={2} xs={2}>
                    <Image
                      src={items.image}
                      rounded
                      className="border-none cartImage"
                      style={{ height: "70px", width: "100px" }}
                    />
                  </Col>

                  <Col md={4} xs={3} className="itemcartname mt-3 ms-3">
                    <h6>{items.name.substring(0, 20)}</h6>
                  </Col>

                  <Col md={2} xs={2} className="mt-3 me-1">
                    <h5>₹{items.price}</h5>
                  </Col>

                  <Col md={1} xs={2} className="mt-3">
                    <Form.Control
                      as="select"
                      value={items.qty}
                      onChange={(e) =>
                        addTocartHandler(items, Number(e.target.value))
                      }
                    >
                      {[...Array(items.countInStock).keys()].map((x) => (
                        <option value={x}>{x}</option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2} xs={1} className="mt-3">
                    <Button
                      variant="danger"
                      onClick={() => deleteCartItemHandler(items._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Col>
            ))}

            <Col lg={4} md={4} xs={6} className="cartSubtotal">
              <Card style={{ width: "18rem" }} className="text-center">
                <ListGroup className="border-warning">
                  <Card.Body>
                    <ListGroup.Item className="p-2">
                      {" "}
                      <Card.Title>SubTotal ({cartCount}) Items</Card.Title>
                    </ListGroup.Item>

                    <ListGroup.Item className="p-2 text-white">
                      {" "}
                      <Card.Subtitle className="mb-2 text-white">
                        ₹{cartTotalPrice}
                      </Card.Subtitle>
                    </ListGroup.Item>

                    <ListGroup.Item className="p-2">
                      {" "}
                      <Button
                        variant="warning"
                        onClick={() => checkoutHandler()}
                      >
                        Proceed to checkout
                      </Button>
                    </ListGroup.Item>
                  </Card.Body>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CartScreen;
