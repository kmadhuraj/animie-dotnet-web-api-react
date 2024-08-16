import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
// import refresh from "./components/Authentication/refresh.js"
const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  // refresh:refresh

});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
