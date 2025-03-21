import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen, QuickPayIcon } from "./Icons";
import { useSelector } from "react-redux";

function NavBar() {
  const { UserData, Token, role } = useSelector((state) => state.User);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  console.log("role", role);
  //  alert("role",role);
  useEffect(() => {
  }, [])


  return (
    <>
      <nav className="navbar border  ">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>QuickPay</span>
            {/* <i className="fas fa-code"></i> */}
            <span className="icon">
              <QuickPayIcon />
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/AboutUs"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/ContactUs"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
            {
              Token ?
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to={`${role == 'admin' ? "Dashboard" : "admin-dashboard"}`}
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <div className="rounded-full p-2 border bg-sky-500 text-white">
                    <img src=""></img>
                    AN
                  </div>
                </>

                : <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/Login"
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/Signup"
                      activeClassName="active"
                      className="nav-links"
                      onClick={handleClick}
                    >
                      Signup
                    </NavLink>
                  </li>
                </>
            }

          </ul>
          <div className="md:hidden bg-[#6c5ce7] text-white p-2 rounded-lg z-50" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;