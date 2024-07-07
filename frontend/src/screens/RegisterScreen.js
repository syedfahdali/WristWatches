import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/slices/userApiSlice";
import {userRegister} from '../redux/slices/registerSlice'

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  const [register,{isLoading}]  = useRegisterMutation()

     const dispatch=useDispatch()
      const navigate=useNavigate()

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validate email
    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    //validate username

    if (!name) {
      setNameError("name is required");
    } else if (!usernameRegex.test(name)) {
      setNameError("Please enter a valid username");
    } else {
      setNameError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 6 characters, including uppercase, lowercase, and a number"
      );
    } else {
      setPasswordError("");
    }


    if (!confirmPassword) {
      setConfirmPasswordError(" confirm Password is required");
    } else if (password!==confirmPassword) {
        setConfirmPasswordError(
        "Password mismatch plz check"
      );
    } else {
        setConfirmPasswordError("");
    }





    // Perform further actions if form is valid
    if (
       password === confirmPassword &&
      password &&
      email &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      name &&
      usernameRegex.test(name)



    ) {
      try {


        const registerDetails=await register({name,email,password}).unwrap()
        dispatch(userRegister(registerDetails))
        toast.success('registered successfully')
        navigate('/login')
        
              


      } catch (err) {

        console.log(err)
        toast.error(err?.data?.message|| err?.error)
      }
    }
  };

  return (
    <div>
      <FormContainer>
       <Container>
        <h2 className="mb-5 text-center fw-bold text-white">Register</h2>

        <Form className="login-form" onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label className="text-white mb-2">UserName</Form.Label>
            <Form.Control
              type="name"
              placeholder="enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!nameError}
            />
            <Form.Control.Feedback type="invalid">
              {nameError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white mb-2">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm1.ControlInput1">
            <Form.Label className="text-white mb-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm1.ControlInput2">
            <Form.Label className="text-white mb-2">
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!confirmPasswordError}
            />
            <Form.Control.Feedback type="invalid">
              {confirmPasswordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="danger" className="mb-5 mt-3" type="submit">
            Login
          </Button>
        </Form>
        </Container>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
