import React, { useState } from 'react';
import axios from 'axios';
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import { ToastContainer, toast } from "react-toastify";
const Forms = () => {
const loginUrl=import.meta.env.VITE_APP_LOGIN_URL;
const [loginData,setLoginData]=useState({})
const Fields={
  email:'',
  password:''
}
const handleUserValue=(e)=>{
  const{value ,name}=e.target
  // console.log(value);
  // setLoginData({...Fields,[name]:value

  // })   
}
console.log(Fields.email);
console.log(Fields.password);
  const login=()=>{
    console.log("login")
    console.log(loginData)
    axios.post(loginUrl,loginData)
    .then(()=>{
      toast.success("User login success")
    })
    .catch(()=>{
      toast.error("login failed")
    })
  }
// const test=()=>{
// console.log("clicked")
// }

  return (
    <CDBContainer>
      <ToastContainer/>
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4"> Sign in </p>
          </div>
          <CDBInput placeholder='Email' name='email' onChange={handleUserValue} material hint="E-mail" type="email" />
          <CDBInput placeholder='Password' name='password' onChange={handleUserValue} material hint="Password" type="password" />
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <CDBInput type="Checkbox" />
            <p className="m-0">Remember me</p>
            <CDBLink to="#">Forgot Password ?</CDBLink>
          </div>
          <CDBBtn onClick={login} color="dark" className="btn-block my-3 mx-0">
            Sign in
          </CDBBtn>
          <p className="text-center">
            Not a member?{' '}
            <CDBLink className="d-inline p-0" to="#">
              Register
            </CDBLink>
          </p>
          <p className="text-center"> or sign in with</p>
          <div className="flex-row my-3 d-flex justify-content-center">
            <CDBBtn color="white" style={{ boxShadow: 'none' }}>
              <CDBIcon fab icon="facebook-f" />
            </CDBBtn>
            <CDBBtn color="white" className="m-0" style={{ boxShadow: 'none' }}>
              <CDBIcon fab icon="twitter" />
            </CDBBtn>
            <CDBBtn color="white" style={{ boxShadow: 'none' }}>
              <CDBIcon fab icon="google-plus-g" />
            </CDBBtn>
          </div>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
};
export default Forms;