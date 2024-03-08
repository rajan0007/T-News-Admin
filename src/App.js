import React from "react";
import "./App.css";
// import Dashboard from "./Dashboard";
import Footer from "./Footer";
import Header from "./Header";
import MainPage from "./MainPage";
// import Router from "./Router";
import SideBar from "./SideBar";
import Login from "./Pages/Login/Login";
// import axios from "axios";
import { AppContext } from "./Lib/ContextLib";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
// import { API_URL } from "./config";
import Contactus from "./Pages/Contactus/Contactus";
import ChangePassword from "./Pages/ChangePass/ChangePassword";
import ForgotPassword from "./Pages/ForgotPass/ForgotPassword";
import ChangeEmail from "./Pages/ChangeEmail/ChangeEmail";
import axiosInstance from "./services/http-common";
import DataServices from "./services/requestApi";

function App() {
  let Authenticated = sessionStorage.getItem("token");
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [showPage, setShowPage] = React.useState(false);
  const [accessObject, setAccessOject] = React.useState([]);
  const [expand, setExpand] = React.useState();
  const [active1, setActive1] = React.useState(true);
  const [active2, setActive2] = React.useState(true);
  const [active3, setActive3] = React.useState(true);
  const [active4, setActive4] = React.useState(true);
  const [active5, setActive5] = React.useState(true);
  const [active6, setActive6] = React.useState(true);
  const [active7, setActive7] = React.useState(true);
  const [active8, setActive8] = React.useState(true);
  const [active9, setActive9] = React.useState(true);

  const [addNewPlayer, setAddNewPlayer] = React.useState(false);

  // React.useEffect(() => {
  //   if (Authenticated) {
  //     setAuthenticated(true);
      
  //   } else {
  //     setAuthenticated(false);
  //   }
  //   VerifyToken();
  // }, [isAuthenticated, Authenticated]);

  // const VerifyToken = async () => {
  //   try {
  //     // IsToken;
  //     const res = await DataServices.IsToken();
  //     console.log("IsToken res::: ", res);
  //     if (res.data.isValid) {
  //       axiosInstance.defaults.headers.token = sessionStorage.getItem("token");

  //       setAuthenticated(true);
        
  //     } else {
  //       setAuthenticated(false);
  //     }
  //   } catch (error) {
  //     console.log("error::: ", error);
  //   }
  // };

  return (
    <div className="wrapper">
      <ToastContainer />
      <AppContext.Provider
        value={{
          isAuthenticated,
          setAuthenticated,
          showPage,
          setShowPage,
          accessObject,
          setAccessOject,
          expand,
          setExpand,
          active1,
          active2,
          active3,
          active4,
          active5,
          active6,
          active7,
          active8,
          active9,
          addNewPlayer,
          setAddNewPlayer,
          setActive1,
          setActive2,
          setActive3,
          setActive4,
          setActive5,
          setActive6,
          setActive7,
          setActive8,
          setActive9,
        }}
      >
        {isAuthenticated  ? (
          <div className="wrapper">
            <Header />
            <SideBar />
            <MainPage />
            <Footer />
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/change-email" element={<ChangeEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/contact-us" element={<Contactus />} />
          </Routes>
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
