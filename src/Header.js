import React, { useEffect, useState } from "react";

import { useAppContext } from "./Lib/ContextLib";

import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function Header() {
  const { setAuthenticated } = useAppContext();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const history = useNavigate();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const isMobile = width <= 990;
    if (openSidebar || isMobile) {
      body.classList.add("sidebar-collapse");
      // body.classList.remove("sidebar-open");
    } else {
      body.classList.remove("sidebar-collapse");
    }
  }, [openSidebar, width]);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown" style={{ position: "relative" }}>
            <button className="nav-link btn" onClick={() => setIsOpen(!isOpen)}>
              <AccountCircleRoundedIcon />
            </button>
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 35,
                  right: 0,
                  background: "#fff",
                  borderRadius: 5,
                }}
                className="border p-2"
              >
                <button
                  className="dropdown-item btn"
                  onClick={() => {
                    history("/change-password");
                    setAuthenticated(false);
                  }}
                >
                  Change Password
                </button>
                <button
                  className="dropdown-item btn"
                  onClick={() => {
                    history("/change-email");
                    setAuthenticated(false);
                  }}
                >
                  Change Email
                </button>
                <button
                  className="dropdown-item btn "
                  onClick={() => {
                    sessionStorage.clear();
                    setAuthenticated(false);
                  }}
                >
                  Log out
                </button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
