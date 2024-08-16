import React, { useEffect, useState } from "react";
// import dummyimg from "../assets/fantacy.jpg";
// import axios from "axios";
function AnimePage({ animeData }) {
  // const randomImgUrl = import.meta.env.VITE_APP_RANDOM_IMG;
  // const [randomImg, setRandomImg] = useState();

  // useEffect(() => {
  //   axios
  //     .get(randomImgUrl)
  //     .then((response) => {
  //       setRandomImg(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("cant fetch random image" + error);
  //       setAnimeImg({dummyimg});
  //     });
  // }, []);
  const viewAnimedata = animeData.map((animie) => (
    <div key={animie.id}>
      <h1> {animie.name} </h1>
      <p>{animie.description}</p>
    </div>
  ));
  return (
    <>
      <div className="container d-flex align-items-center">
        <div className="text  d-flex flex-column ">{viewAnimedata}</div>
        <div className="animeimg">
          {/* <img style={{width:'600px',height:'400px'}} src={dummyimg} alt="dummy img" /> */}
        </div>
      </div>
    </>
  );
}

export default AnimePage;
