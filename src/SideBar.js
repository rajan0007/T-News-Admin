import React from "react";
import { useNavigate } from "react-router-dom";
// import ReportIcon from "@mui/icons-material/Report";
import SettingsInputSvideoIcon from "@mui/icons-material/SettingsInputSvideo";
import Logo from "../src/img/logo.png";
import { useAppContext } from "./Lib/ContextLib";
// import total_income_icon from "./icon/total_income_icon.svg";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import PostAddIcon from '@mui/icons-material/PostAdd';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
export default function SideBar() {
  const history = useNavigate();
  const isPro = sessionStorage.getItem("role") 
  console.log("isPro",isPro)

  const {
    showPage,
    setShowPage,
    active1,
    active2,
    // active3,
    active4,
    active6,
    // active7,
    active8,
    active9,
    setActive1,
    setActive2,
    setActive3,
    setActive4,
    setActive5,
    setActive6,
    setActive7,
    setActive8,
    setActive9,
    setAddNewPlayer,
    // accessObject,
  } = useAppContext();

  return (
    <div>
      <aside
        className="main-sidebar elevation-4"
        style={{ backgroundColor: "#0d0028", position: "fixed" }}
      >
        <a
          href="/dashboard"
          className="brand-link "
          style={{
            display: "flex",
            justifyContent: "center",
            height: "70px",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ opacity: "0.8", width: "30%", height: "50px" }}
          />
          {/* <h1 style={{ color: "white" }}>
            <span style={{ color: "#ffab3a" }}>
              <b>C</b>
            </span>
            asino
          </h1> */}
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <div className="nav-item mt-4">
                <p
                  className={`nav-link ${
                    window.location.pathname.split("/")[1] === "dashboard" &&
                    "active"
                  }`}
                  id="dashboard"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history("/dashboard");
                    setActive1(true);
                    setActive2(true);
                    setActive3(true);
                    setActive4(true);
                    setActive5(true);
                    setActive9(true);
                    setActive6(true);
                    setActive7(true);
                    setActive8(true);
                  }}
                >
                  <DashboardIcon className="mr-2" style={{ color: "white" }} />
                  <p style={{ color: "white" }}>Dashboard</p>
                </p>
              </div>
              <div className="nav-item">
                <p
                  className={`nav-link ${
                    window.location.pathname.split("/")[1] === "profile" &&
                    "active"
                  }`}
                  id="dashboard"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history("/profile");
                    setActive1(true);
                    setActive2(true);
                    setActive3(true);
                    setActive4(true);
                    setActive5(true);
                    setActive9(true);
                    setActive6(true);
                    setActive7(true);
                    setActive8(true);
                  }}
                >
                  <PersonIcon className="mr-2" style={{ color: "white" }} />
                  <p style={{ color: "white" }}>Profile</p>
                </p>
              </div>
{isPro!="Provider" &&   <li className="nav-item mt-2">
                <p
                  className="nav-link"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActive1(!active1);
                    setActive2(true);
                    setActive3(true);
                    setActive4(true);
                    setActive5(true);
                    setActive9(true);
                    setActive6(true);
                    setActive7(true);
                    console.log("active8::: ", active8);
                    setActive8(true);
                  }}
                >
                  <div>
                    <SupervisorAccountIcon
                      className=" mr-2"
                      style={{ color: "white" }}
                    />
                    <p
                      style={{
                        color: "white",
                      }}
                    >
                      Users
                    </p>
                  </div>
                  {active1 ? (
                    <NavigateNextRoundedIcon style={{ color: "white" }} />
                  ) : (
                    <ExpandMoreRoundedIcon style={{ color: "white" }} />
                  )}
                </p>
                <ul className={`nav ${active1 ? "nav-treeview" : ""}`}>
                  <li className="nav-item">
                    <p
                      className={`nav-link ${
                        window.location.pathname.split("/")[1] ===
                          "customer-list" && "active"
                      } d-flex`}
                      onClick={() => {
                        history("/customer-list");
                        setShowPage(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <p
                        className="mt-1 "
                        style={{ marginLeft: "34px", color: "white" }}
                      >
                        Customer List
                      </p>
                    </p>
                  </li>
                  <li className="nav-item">
                    <p
                      className={`nav-link ${
                        window.location.pathname.split("/")[1] ===
                          "professional-list" && "active"
                      } d-flex`}
                      onClick={() => {
                        history("/professional-list");
                        setShowPage(false);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <p
                        className="mt-1 "
                        style={{ marginLeft: "34px", color: "white" }}
                      >
                        Professional List
                      </p>
                    </p>
                  </li>
                </ul>
              </li>
              }
              
              <div className="nav-item">
                <p
                  className={`nav-link ${
                    window.location.pathname.split("/")[1] === "booking" &&
                    "active"
                  }`}
                  id="booking"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history("/booking");
                    setActive1(true);
                    setActive2(true);
                    setActive3(true);
                    setActive4(true);
                    setActive5(true);
                    setActive9(true);
                    setActive6(true);
                    setActive7(true);
                    setActive8(true);
                  }}
                >
                  <PostAddIcon  className="mr-2" style={{ color: "white" }} />
                  <p style={{ color: "white" }}>Booking</p>
                </p>
              </div>
              
              
            
             
              {isPro!="Provider" &&  <div className="nav-item">
                <p
                  className={`nav-link ${
                    window.location.pathname.split("/")[1] === "blog" &&
                    "active"
                  }`}
                  id="blog"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history("/blog");
                    setActive1(true);
                    setActive2(true);
                    setActive3(true);
                    setActive4(true);
                    setActive5(true);
                    setActive9(true);
                    setActive6(true);
                    setActive7(true);
                    setActive8(true);
                  }}
                >
                  <SubscriptionsIcon className="mr-2" style={{ color: "white" }} />
                  <p style={{ color: "white" }}>Blog</p>
                </p>
              </div> }
             
              <div className="nav-item">
                <p
                  className={`nav-link ${
                    window.location.pathname.split("/")[1] === "payment" &&
                    "active"
                  }`}
                  id="payment"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history("/payment");
                    setActive1(true);
                    setActive2(true);
                    setActive3(true);
                    setActive4(true);
                    setActive5(true);
                    setActive9(true);
                    setActive6(true);
                    setActive7(true);
                    setActive8(true);
                  }}
                >
                  <AccountBalanceIcon className="mr-2" style={{ color: "white" }} />
                  <p style={{ color: "white" }}>Payment</p>
                </p>
              </div>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
