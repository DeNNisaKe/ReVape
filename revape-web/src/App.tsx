import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import MainPage from "./components/MainPage";
import MySettings from "./components/MySettings";
import { PrivateRoute, PublicRoute } from "./components/Routing";
import CouponShop from "./components/CouponShop";
import MyCoupons from "./components/MyCoupons";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/about-us"
            element={
              <PublicRoute>
                <AboutUs />
              </PublicRoute>
            }
          />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-settings"
            element={
              <PrivateRoute>
                <MySettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/coupon-shop"
            element={
              <PrivateRoute>
                <CouponShop />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-coupons"
            element={
              <PrivateRoute>
                <MyCoupons />
              </PrivateRoute>
            }
          />
          <Route path="*">"404 Not Found"</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
