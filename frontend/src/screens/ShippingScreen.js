import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const addressRegex = /^[a-zA-Z0-9\s.,'-]*$/;
  const numberRegex = /^-?\d+(\.\d+)?$/;

   const {shippingAddress}=useSelector((state)=>state?.cart)

   const navigate= useNavigate()


  const [address, setAddress] = useState(shippingAddress?.address || '' );
  const [addressError, setAddressError] = useState("");

  const [city, setCity] = useState(shippingAddress?.city || '');
  const [cityError, setCityError] = useState("");

  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [countryError, setCountryError] = useState("");

  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [postalCodeError, setPostalCodeError] = useState("");


   const dispatch=useDispatch()

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validate address
    if (!address) {
      setAddressError("Address is required");
    } else if (!addressRegex.test(address)) {
      setAddressError("Please enter a valid  address");
    } else {
      setAddressError("");
    }

    if (!postalCode) {
        setPostalCode("Address is required");
      } else if (!numberRegex.test(postalCode)) {
        setPostalCodeError("Please enter a valid postal code");
      } else {
        setPostalCodeError("");
      }

    if (!city) {
      setCityError("plz enter city");
    }

    if (!country) {
        setCountryError("plz enter your country");
      }

    // Perform further actions if form is valid
    if (address && addressRegex.test(address) && city && postalCode && numberRegex.test(postalCode) && country) {
      try {


       
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment-method')

      } catch (err) {

        console.log('123',err)
      }
    }
  };

  return (
    <div>

          <CheckoutSteps step1={'step1'}/>


      <FormContainer>
      <Container>
        <h1 className="mt-4 mb-5">Enter Shipping Details</h1>

        <Form className="shipping-form" onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label className="text-white mb-2">Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              isInvalid={!!addressError}
            />
            <Form.Control.Feedback type="invalid">
              {addressError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label className="text-white mb-2">City</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              isInvalid={!!cityError}
            />
            <Form.Control.Feedback type="invalid">
              {cityError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
            <Form.Label className="text-white mb-2">Postal Code</Form.Label>
            <Form.Control
              type="number"
              placeholder="enter postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              isInvalid={!!postalCodeError}
            />
            <Form.Control.Feedback type="invalid">
              {postalCodeError}
            </Form.Control.Feedback>
          </Form.Group>




          <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
            <Form.Label className="text-white mb-2">Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              isInvalid={!!countryError}
            />
            <Form.Control.Feedback type="invalid">
              {countryError}
            </Form.Control.Feedback>
          </Form.Group>


          <Button variant="danger" className="mb-5 mt-3 loginBtn" type="submit">
            Submit
          </Button>
        </Form>
        </Container>
      </FormContainer>
     
    </div>
  );
};

export default ShippingScreen;
