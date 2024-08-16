import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import AnimePage from "../pages/AnimePage";
import Pagination from "./Pagination";
import dummyimg from "../../assets/fantacy.jpg";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios"
function ViewAnimes({ getAnimeData }) {
  //   const [animePage, setAnimePage] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [animeData, setAnimeData] = useState([]);

  //used to manage the token to snd reqest
  const authHeader = useAuthHeader();
  const headers={'Authorization':authHeader}

  //pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(1);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const CurrentPost = animeData.slice(firstPostIndex, lastPostIndex);


  const Style = {
    animieText: {
      backgroundColor: "rgb(134 131 149)",
      
    },
  };
  const getData = () => {
    axios
      .get(apiUrl,{headers})
      .then((response) => {
        setAnimeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    // Fetch data from the API
    getData();
  }, []);


  return (
    <>
      <Navbar />
      <div
        style={Style.animieText}
        className="container-wrap d-flex flex-column align-items-center gap-5 h-100"
      >
        <div className="view-details d-flex justify-content-md-center align-items-md-center flex-md-row gap-3  flex-column-reverse my-5">
          <div className="animie-text container d-flex flex-column align-items-center " >
            <AnimePage animeData={CurrentPost} />
          </div>
          <div className="animie-img container d-flex align-items-center justify-content-center ">
            <img
              className="w-100"
              src={dummyimg}
              alt="animie-img"
            />
          </div>
        </div>
        <div className="pagination d-flex  my-5">
          <Pagination
            totalPost={animeData.length}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default ViewAnimes;
