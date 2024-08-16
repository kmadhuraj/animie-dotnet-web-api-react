import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage.jsx";
import Crud from "../../React-animie/src/components/pages/Crud.jsx";
import ViewAnimes from "../../React-animie/src/components/pages/ViewAnimes.jsx";
import UserRegistration from "./components/Authentication/UserRegistration.jsx";
import Login from "./components/Authentication/Login.jsx";
// import { useState, useEffect } from "react";
// import axios from "axios";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
// import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import "./App.css";

function App() {
  // const [animeData, setAnimeData] = useState([]);
  // const apiUrl = import.meta.env.VITE_APP_API_URL;
  // const authHeader = useAuthHeader();
  // const headers={'Authorization':authHeader}
  // console.log("auth header",headers)
  // const getData = () => {
  //   axios
  //     .get(apiUrl,{headers})
  //     .then((response) => {
  //       setAnimeData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };
  // useEffect(() => {
  //   // Fetch data from the API
  //   getData();
  // }, []);

  //routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/crud",
      element: (
        <RequireAuth fallbackPath="/sign-in">
          <Crud />,
        </RequireAuth>
      ),
    },

    {
      path: "/view-animie",
      element: (
        <RequireAuth fallbackPath="/sign-in">
          <ViewAnimes />,
        </RequireAuth>
      ),
    },
    {
      path: "sign-up",
      element: <UserRegistration />,
    },
    {
      path: "sign-in",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
