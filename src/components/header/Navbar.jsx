import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
//for display user data after authentication
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
const Navbar = () => {
  //for displaying user name
  const auth = useAuthUser();
  const username = auth?.name;

  //for logout
  const signOut = useSignOut();

  //logout function
  const logout = () => {
    signOut();
    console.log("logged out");
  };

  return (
    <>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/crud">
                  Add Animie
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-animie">
                  View Animies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-up">
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign-in">
                  SignIn
                </Link>
              </li>
              <li className="nav-item bg-info" onClick={logout}>
                Logout
              </li>
              <li className="nav-item">
                <p className="text-bg-danger nav-link"> {username}</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
