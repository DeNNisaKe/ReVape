import React from "react";
import logo from "../logo/ReVapeLogoPng.png";
import logoText from "../logo/ReVapeLogoText.png";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHouse,
  faRightFromBracket,
  faRightToBracket,
  faTicket,
  faUserPlus,
  faUsersBetweenLines,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const authToken = Cookies.get("authToken");

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("role");
    Cookies.remove("userId");
    window.location.href = "/";
  };

  return (
    <nav className="shadow-md" style={{ position: "absolute", width: "100%" }}>
      <div className="flex justify-between items-center py-4 px-6">
        <a href="/">
          <div className="flex justify-between items-center">
            <img src={logo} alt="Logo" className="h-12 mr-3 w-auto" />{" "}
            <img src={logoText} alt="LogoText" className="h-14 w-auto" />
          </div>
        </a>
        <ul className="flex space-x-4">
          {!authToken && ( // Conditionally render when user is not authenticated
            <>
              <li>
                <a
                  href="/about-us"
                  className="text-white p-2 font-bold hover:text-white hover:border hover:border-white"
                >
                  <FontAwesomeIcon
                    icon={faUsersBetweenLines}
                    className="mr-2"
                  />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="login"
                  className="text-white p-2 font-bold hover:text-white hover:border hover:border-white"
                >
                  <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
                  Sign In
                </a>
              </li>
              <li>
                <a
                  href="register"
                  className="text-white p-2 font-bold hover:text-white hover:border hover:border-white"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Sign Up
                </a>
              </li>
            </>
          )}
          {authToken && ( // Conditionally render when user is authenticated
            <ul className="flex space-x-4 items-center">
              <li>
                <a
                  href="main"
                  className="text-white p-2 font-bold hover:text-white hover:border hover:border-white"
                >
                  <FontAwesomeIcon icon={faHouse} className="mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a
                  href="coupon-shop"
                  className="text-white p-2 font-bold hover:text-white hover:border hover:border-white"
                >
                  <FontAwesomeIcon icon={faTicket} className="mr-2" />
                  Coupon Shop
                </a>
              </li>
              <li>
                <a
                  href="my-coupons"
                  className="text-white p-2 font-bold hover:text-white hover:border hover:border-white"
                >
                  <FontAwesomeIcon icon={faWallet} className="mr-2" />
                  My Coupons
                </a>
              </li>
              <li>
                <a
                  href="my-settings"
                  className="text-white p-2 font-bold hover:text-white hover:border hover:border-white"
                >
                  <FontAwesomeIcon icon={faGear} className="mr-2" />
                  My Settings
                </a>
              </li>
              <button
                onClick={logout}
                className="text-white font-bold p-2 hover:text-white hover:border hover:border-white"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                Logout
              </button>
            </ul>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
