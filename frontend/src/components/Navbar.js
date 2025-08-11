import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './style/Navbar.css';

export default function Navbar() {
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Dear Daizy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-Link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>{" "}
              &nbsp;
              <li className="nav-item">
                <Link
                  className={`nav-Link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            { !localStorage.getItem('token') ?
              <form className="d-flex">
                <Link
                  className="btn mx-2"
                  to="/login"
                  role="button"
                  // style={{ backgroundColor: "#fab2ff" }}
                >
                  Login
                </Link>
                <Link
                  className="btn mx-2"
                  to="/signup"
                  role="button"
                  // style={{ backgroundColor: "#fab2ff" }}
                >
                  Sign Up
              </Link>
            </form>
            :
              <button
                className="btn mx-2"
                // style={{ backgroundColor: "#fab2ff"}}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                type="button"
              >
                Logout
              </button>
              }
          </div>
        </div>
      </nav>
    </>
  );
}
