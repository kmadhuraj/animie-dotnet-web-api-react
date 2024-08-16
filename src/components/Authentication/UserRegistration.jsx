import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import logo from "./../../assets/donatello.png";
import "../../../src/App.css"

const Forms = () => {
  const [userData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    salt: "string",
    isAdmin: false,
  });
  
  const initialFormState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    salt: "",
    isAdmin: false,
  };

  const [ediitUserData, setEditUserData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const userApiUrl = import.meta.env.VITE_APP_USR_API_URL;

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setUserFormData({ ...userData, [name]: value });
  };

  const clear = () => {
    setEditUserData(initialFormState);
    console.log("cleared");
    setErrors({});
  };

  const userReg = (event) => {
    event.preventDefault();
    const validationErrors = {};
    // console.log(userData.username)
    if (!userData.username.trim()) {
      validationErrors.username = "Username required";
    }
    // console.log(validationErrors)
    if (!userData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      validationErrors.email = "Invalid email enter the correct email";
    }
    if (!userData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      validationErrors.password = "Password should be atleast 6 Characters";
    }
    if (userData.confirmPassword !== userData.password) {
      validationErrors.confirmPassword = "Password didn't matched";
    }
    setErrors(validationErrors);
    //to check whether the validation error is empty or not
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post(userApiUrl, userData)
        .then(() => {
          toast.success("User Registration Successfull");
          clear();
        })
        .catch((error) => {
          toast.error("User Registration Failed");
        });
    }
  };
  // const style={
  //   body:{
  //       margin:'0px'
  //   }
  // }

  return (
    <>
      <div
        style={{ height: "100vh", width:"auto"}}
        className="container-fluid d-flex justify-content-center align-items-center bg-dark"
      >
        <ToastContainer />
        <CDBContainer className="d-flex flex-column justify-content-around align-items-center  flex-md-row border-5 " style={{backgroundColor:"#edf2fa",borderRadius:"28px"}}>
          <div className="d-flex flex-column justify-content-lg-start align-items-center align-items-md-start gap-4  ">
            <img src={logo} className="w-25 h-auto" alt="logo-img" />
            <h2 className="align-content-center justify-content-center roboto-regular ">
              Create a Animax Account
            </h2>
            <p className="text-center text-md-start">Sign up for Animax to enhance your anime experience and access exclusive content! </p>
          </div>
          <CDBCard style={{borderRadius:"28px"}} >
            <CDBCardBody className="mx-4">
              <div className="text-center mt-4 mb-2">
                <p className="h4"> Sign up </p>
              </div>
              <div className="form-flex-row mb-n4">
                <div className="col">
                  <CDBInput
                    placeholder="Username"
                    // material
                    // hint="Username"
                    name="username"
                    type="text"
                    value={ediitUserData.username}
                    onChange={handleInputChange}
                    // onClick={clear}
                  />
                  {/* {console.log("this is data"+ediitUserData.username)} */}
                  {errors.username && (
                    <span className="text-danger">{errors.username}</span>
                  )}
                  {/* <span className="text-danger">{errors.username}</span> */}
                </div>
                <div className="col">
                  <CDBInput
                    placeholder="Email"
                    // material
                    // hint="E-mail"
                    value={ediitUserData.email}
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    // onClick={clear}
                    // onChange={handleClear}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                  {/* <span className="text-danger">{errors.email}</span> */}
                </div>
              </div>
              <p className="text-muted text-center small mt-n4">
                At least 8 characters and 1 digit
              </p>
              <CDBInput
                placeholder="Password"
                // material
                // hint="Password"
                type="password"
                name="password"
                value={ediitUserData.password}
                onChange={handleInputChange}
                // onClick={clear}
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
              {/* <span className="text-danger">{errors.password}</span> */}
              <CDBInput
                placeholder="Re-enter Password"
                // material
                // hint="Password"
                type="password"
                name="confirmPassword"
                value={ediitUserData.confirmPassword}
                onChange={handleInputChange}
              />
              <span className="text-danger">{errors.confirmPassword}</span>

              <CDBBtn
                onClick={userReg}
                // onclick={onclick}
                color="dark"
                className="btn-block my-3 mx-0"
              >
                Sign up
              </CDBBtn>

              <p className="text-center m-0">
                Already have an account?{" "}
                <CDBLink className="d-inline p-0" to="/sign-in">
                  Sign In
                </CDBLink>
              </p>
              <hr />
              <p className="text-center">
                By clicking <em>Sign up</em> you agree to our{" "}
                <CDBLink className="d-inline p-0" to="#">
                  terms of service
                </CDBLink>
              </p>
            </CDBCardBody>
          </CDBCard>
        </CDBContainer>
      </div>
    </>
  );
};
export default Forms;
