import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//for display user data after authentication
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { toast, ToastContainer } from "react-toastify";
//for decoding the jwt token for getting the roles
import { jwtDecode } from "jwt-decode";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
const Navbar = () => {
  //for displaying user name
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  //to get the token
  const [role, setRole] = useState(false);
  useEffect(() => {
    if (auth) {
      const token = authHeader.replace("Bearer", " ");
      const decodeToken = jwtDecode(token);
      const roles =
        decodeToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      if (roles == "Admin") {
        setRole(true);
      } else {
        setRole(false);
      }
      console.log(token);
      console.log("docoded", decodeToken);
      // console.log("role is ",roles)
    }
  }, [auth, authHeader]);

  //for logout
  const [username, setUsername] = useState(auth?.name);
  const signOut = useSignOut();

  //logout function
  const logout = () => {
    if (auth) {
      signOut();
      setUsername("");
      toast.success("User Logged out");
      console.log("logged out");
    } else {
      console.log("no user");
    }
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div className="container-fluid">
          <h6 className="navbar-brand" to="#">
            Animax
          </h6>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li hidden={!role} className="nav-item">
                <Link className="nav-link" to="/crud">
                  Add Animie
                </Link>
              </li>
              <li hidden={!auth} className="nav-item">
                <Link className="nav-link" to="/view-animie">
                  View Animies
                </Link>
              </li>
            </ul>

            <ul  className="navbar-nav">
              <li hidden={auth} className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  SignUp
                </Link>
              </li>
              <li hidden={auth} className="nav-item">
                <Link className="nav-link" to="/sign-in">
                  SignIn
                </Link>
              </li>

              <li className="nav-item">
                <button
                  hidden={!auth}
                  style={{ color: "red" }}
                  className="nav-link"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>

              <li className="nav-item">
                <p className=" nav-link text-info"> {username}</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
