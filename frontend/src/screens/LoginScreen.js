import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Container, Form } from "react-bootstrap";
import { useLoginMutation } from "../redux/slices/userApiSlice";
import { setCredentials } from "../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
const LoginScreen = () => {
  const userInfo = useSelector((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading ,isError }] = useLoginMutation();



  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";



  useEffect(() => {
    if (userInfo.userInfo !== null) {
      navigate(redirect);
    } else {
      navigate("/login");
    }
  }, [userInfo, redirect, navigate]);

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

    // Perform further actions if form is valid
    if (
      email &&
      password &&
      emailRegex.test(email) &&
      passwordRegex.test(password)
    ) {
      try {
        console.log(email, password);

        const userDetails = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...userDetails }));
        toast("login successfully");
        navigate("/");
      } catch (err) {
        toast(err?.data?.message || err.error);
        console.log("err", err);
        navigate('/login')
        
      }
    }
  };

  

  return (
    <>
      {isLoading && (
        <Loader />
      ) 
      }
      
        <div>
          <FormContainer>
            <Container>
              <h2 className="mb-5 text-center fw-bold text-white">Login</h2>

              <Form className="login-form" onSubmit={handleFormSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-white mb-2">
                    Email address
                  </Form.Label>
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

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm1.ControlInput1"
                >
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

                <Button
                  variant="danger"
                  className="mb-5 mt-3 loginBtn"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Container>
          </FormContainer>
        </div>

      
     
    </>
  )
}

export default LoginScreen;
