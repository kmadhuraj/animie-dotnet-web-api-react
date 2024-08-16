import React, { Component, useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/donatello.png";
import animieImg from '../../assets/anime-traveling.jpg'
import '../../App.css';
import { useLocation } from "react-router-dom";
export default function HomePage() {

  const [AnimieImg, setAnimeImg] = useState("");
  const location=useLocation();
  const navigate = useNavigate();

  const Style = {
    ContainerStyle: {
      backgroundColor: "#222325",
      color: "white",
    },
    logoStyle: {
      height: "auto",
      width: "90px",
    },
  };

  // useEffect(() => {
  //   const AnimeUrl = import.meta.env.VITE_APP_ANIMIE_IMG_URL;

  //   axios
  //     .get(AnimeUrl)
  //     .then((response) => {
  //       setAnimeImg(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching anime image:", error);
  //       setAnimeImg(animieImg
  //       );
  //     });
  // }, []);

  const handleNavigateSeeDatials = () => {
    navigate("/view-animie");
  };
  return (
    <>
      <Navbar  />
      
      <div style={Style.ContainerStyle} className="d-flex flex-column-reverse flex-md-row">
        <div className="home-page-container container my-5 mx-md-5">
          <img style={Style.logoStyle} className="" src={logo} alt="logo" />
          <h2>See The Words Famous Animie</h2>
          <p>
            Welcome to Animax! Whether you're looking to explore new series,
            dive deep into beloved classics, or discover hidden gems, you can
            find detailed plot summaries and comprehensive storylines of all
            your favorite anime here. Our extensive database offers insights
            into every genre, from action-packed adventures and heartwarming
            romances to spine-chilling horrors and mind-bending mysteries. Join
            us at Animax to embark on an unforgettable journey through the
            fascinating world of anime, where every story is an adventure
            waiting to be explored!
          </p>
          <button
            onClick={handleNavigateSeeDatials}
            className="btn btn-warning my-5"
          >
            See Details
          </button>

          
          <div className="d-flex my-5">
            <ul className="list-unstyled d-flex gap-4">
              <h6>Follow us on </h6>
              <li>
                <Link to="">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
              </li>
              <li>
                <Link to="">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <img
            className="home-img my-5  w-100" 
            src={animieImg}
            alt="random image"
          />
        </div>
      </div>
    </>
  );
}

