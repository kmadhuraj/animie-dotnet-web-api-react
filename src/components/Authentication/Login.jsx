import React, { useState } from "react";
import axios from "axios";
import {
  CDBInput,
  CDBCard,
  CDBCardBody,
  CDBIcon,
  CDBBtn,
  CDBLink,
  CDBContainer,
} from "cdbreact";
import { ToastContainer, toast } from "react-toastify";
import logo from "./../../assets/donatello.png";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
const Forms = () => {
  const loginUrl = import.meta.env.VITE_APP_LOGIN_URL;
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  //sign in using react auth kit

  const handleUserValue = (e) => {
    const { value, name } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const signIn = useSignIn();
  // console.log(loginData);
  const login = () => {
    axios
      .post(loginUrl, loginData)
      .then((response) => {
        toast.success("User login success");
        console.log(response.data);
        signIn({
          auth: {
            // token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc…xLyJ9.LfUfCf5GjN016ThjFvYnLD-7AKbJGoFiVrhSzgXS_4E",
            token: response.data,
            type: "Bearer",
          },
          userState: {
            name: loginData.email,
          },
        });
        // console.log(SignIn.auth.token)
        // navigate("/", { state: { name: loginData.email } });
      })
      .catch(() => {
        toast.error("login failed");
      });
  };

  return (
    <div
      style={{ height: "100vh", width: "auto" }}
      className="container-fluid d-flex justify-content-center align-items-center bg-dark"
    >
      <CDBContainer
        className="d-flex flex-column justify-content-evenly align-items-center  flex-md-row border-5 "
        style={{ backgroundColor: "#edf2fa", borderRadius: "28px" }}
      >
        <ToastContainer />
        <div className="d-flex flex-column justify-content-lg-start align-items-center align-items-md-start gap-4  ">
          <img src={logo} className="w-25 h-auto" alt="logo-img" />
          <h2 className="align-content-center justify-content-center roboto-regular ">
            Login to Animax
          </h2>
          <p className="text-center text-md-start">
            Login to enhance your anime experience and access exclusive content!{" "}
          </p>
        </div>
        <CDBCard style={{ width: "20rem" }}>
          <CDBCardBody className="mx-4">
            <div className="text-center mt-4 mb-2">
              <p className="h4"> Sign in </p>
            </div>
            <CDBInput
              placeholder="Email"
              name="email"
              onChange={handleUserValue}
              material
              hint="E-mail"
              type="email"
            />
            <CDBInput
              placeholder="Password"
              name="password"
              onChange={handleUserValue}
              material
              hint="Password"
              type="password"
            />
            <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
              <CDBInput type="Checkbox" />
              <p className="m-0">Remember me</p>
              <CDBLink to="#">Forgot Password ?</CDBLink>
            </div>
            <CDBBtn
              onClick={login}
              color="dark"
              className="btn-block my-3 mx-0"
            >
              Sign in
            </CDBBtn>
            <p className="text-center">
              Not a member?{" "}
              <CDBLink className="d-inline p-0" to="/sign-up">
                Register
              </CDBLink>
            </p>
            <p className="text-center"> or sign in with</p>
            <div className="flex-row my-3 d-flex justify-content-center">
              <CDBBtn color="white" style={{ boxShadow: "none" }}>
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn
                color="white"
                className="m-0"
                style={{ boxShadow: "none" }}
              >
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn color="white" style={{ boxShadow: "none" }}>
                <CDBIcon fab icon="google-plus-g" />
              </CDBBtn>
            </div>
          </CDBCardBody>
        </CDBCard>
      </CDBContainer>
    </div>
  );
};
export default Forms;
