import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Search = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const userInfo = useSelector((state) => state.login.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  // Ensure cartItems is an array before calling reduce
  const cartCount = Array.isArray(cartItems) ? cartItems.reduce((acc, curr) => acc + Number(curr.qty), 0) : 0;

  console.log("count", cartCount);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="searchBox">
      <Form
        className="d-flex align-items-center searchBox"
        onSubmit={handleFormSubmit}
      >
        <Form.Group className="mb-3 me-2 mt-3">
          <Form.Control
            type="name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-danger"
          className="searchBTN"
        >
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Search;
