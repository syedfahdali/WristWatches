import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useAddReviewMutation, useGetProductDetailsQuery } from "../redux/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ProductScreens = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment,setComment]=useState('')

  const { id } = useParams();

  const [qty, setQty] = useState();

  const {
    data: productDetails,
    isLoading,
    isError,refetch
  } = useGetProductDetailsQuery(id);

  const [addReview,{isLoading:addReviewLoad, isError:addReviewErr}]=  useAddReviewMutation()

  const addToCartHandler = () => {
    dispatch(addToCart({ ...productDetails, qty }));
    navigate("/cart");
  };


  const handleSubmit=async(e)=>{

    e.preventDefault()

    try{

      await addReview({rating,comment,id})
      toast.success('review added successfully')
      refetch()

    }

    catch(err){

       console.log(err);
        toast.error(err?.data.message || err.error)
    }



  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant={"danger"}>
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <div>
        <Meta title={productDetails.name}/ >
          <Container>
            <Row>
              <Col lg={4} md={4} sm={12} className="mt-5">
                <Link to="/">
                  <Button className="bg-dark mt-4 mb-5 ms-4">Go Back</Button>
                </Link>

                <Image
                  src={productDetails.image}
                  thumbnail
                  className="pe-5"
                  style={{ border: "none" }}
                />
              </Col>

              <Col lg={4} md={4} sm={12} className="text-center">
                <h3 className="font-bold mt-5 fs-3 text-white pb-5 border-bottom">
                  {productDetails.name}
                </h3>

                <h3 className="pt-3 pb-3 fs-5  border-bottom">
                  <Rating
                    rating={productDetails.rating}
                    numReviews={productDetails.numReviews}
                  />
                </h3>

                <h3 className="pt-3 pb-3 fs-5  border-bottom text-white">
                  Price : ₹ {productDetails.price}
                </h3>

                <p className="pt-2 pb-3 fs-5">
                  <span className="fw-bold text-white"> Description :</span>{" "}
                  {productDetails.description}
                </p>
              </Col>

              <Col lg={3} md={3} sm={12} className="text-center">
                <ListGroup className="ps-4 productDetailsPrice">
                  <ListGroup.Item className="border propagelist">
                    Price :{" "}
                    <span className="ps-3">₹ {productDetails.price} </span>
                  </ListGroup.Item>
                  <ListGroup.Item className="border propagelist">
                    status:{" "}
                    <span className="ps-3">
                      {productDetails.countInStock === 0
                        ? "out of stock"
                        : `In stock`}{" "}
                    </span>
                  </ListGroup.Item>

                  {productDetails.countInStock > 0 && (
                    <ListGroup.Item className="border propagelist">
                      <Row>
                        <Col>Qty :</Col>

                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(productDetails.countInStock).keys()].map(
                              (x) => (
                                <option value={x}>{x}</option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {productDetails.countInStock === 0 ? (
                    <ListGroup.Item className="border propagelist">
                      <Button className="bg-success" disabled>
                        Add to Cart{" "}
                      </Button>
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item className="border propagelist">
                      <Button className="bg-success" onClick={addToCartHandler}>
                        Add to Cart{" "}
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>
            </Row>

            <Row style={{ marginTop: "130px" }}>
              <Col md={6} sm={12} className="">
                <h3 className="mb-5 ms-5 " >Read Reviews </h3>

                {productDetails.reviews.length === 0 ? (
                  <div className="mt-5 text-center" style={{ width: "300px" }}>
                    <Message variant="info">No reviews yet</Message>{" "}
                  </div>
                ) : (
                  <div
                    style={{
                      width: "350px",
                      height: "200px",
                      overflow: "auto",
                    }}
                  >
                    <ListGroup className="p-4">
                      {productDetails.reviews.map((rev) => (
                        <ListGroup.Item className="p-3" key={rev.name}>
                          <h5 className="pb-2 text-danger">{rev.name}</h5>
                          <Rating
                            rating={rev.rating}
                            numReviews={productDetails.numReviews}
                          />
                          <p className="pb-2 pt-2">{rev.comment}</p>
                          <p className="pb-2">
                            {rev.createdAt.substring(0, 10)}
                          </p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                )}
              </Col>
             

       
              <Col md={5} sm={12}>

              {
                addReviewLoad && <Loader/>
                
              }
          

          {
            addReviewErr && <Message variant={"danger"}>
          {addReview?.data.message || isError.error}
        </Message>
          }






                <div className="text-center mb-5 mt-5">
                  <Message variant={"dark"}>Write a Customer Review</Message>
                  </div>

                  <Form className="review-form" onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput13"
                    >
                      <Form.Label className="text-white mb-2 mt-3">
                        Rating
                      </Form.Label>
                      <Form.Select
                        type="select"
                        className="mt-3 mb-3"
                        onChange={(e) => setRating(e.target.value)}
                        style={{width:'150px'}}
                      >
                        <option>select..</option>
                        <option value="1">1--very poor</option>
                        <option value="2">2--poor</option>
                        <option value="3">3--average</option>
                        <option value="4">4--good</option>
                        <option value="5">5--very good</option>
                      </Form.Select>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>write your opinion</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>setComment(e.target.value)} />
      </Form.Group>

      <Button type="submit"> submit </Button>


                  </Form>
                
              </Col>
              
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default ProductScreens;
