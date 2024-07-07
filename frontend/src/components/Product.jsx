import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product,key }) => {

 
  return (
    <div>
      <Card className="m-5">
       <Link to={`/product/${product._id}`}> <Card.Img variant="top" src={product.image} style={{height:'260px'}} /></Link>
        <Card.Body className="text-center">
        <Link to={`/product/${product._id}`}><Card.Title>{product.name.substring(0,20)}</Card.Title></Link>
        <Card.Text>
          <Rating rating={product.rating} numReviews={product.numReviews}/>
          </Card.Text>
          <Card.Text>
           {product.category}
          </Card.Text>
           <Link to={`/product/${product._id}`}> <Button variant="primary">View Details</Button> </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
