import React, { useEffect, useState } from "react";
import backgroundImage from "../wallpaper/landing-page-wallpaper.jpg";
import { Coupon } from "../models/couponModel";
import Cookies from "js-cookie";
import AlertModal from "./modals/AlertModal";
import {
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const userId = Cookies.get("userId");

const CouponShop: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [userData, setUserData] = useState<any>({});

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseErrorModal = () => {
    setIsAlertModalOpen(false);
    setMessage("");
  };

  async function fetchUserData() {
    const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }

  async function buyCoupon(couponId: string) {
    fetch(`http://localhost:8080/api/coupons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userData._id,
        couponId,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.statusCode === 400) {
          setMessage(data.message);
          setAlertType("error");
          setIsAlertModalOpen(true);
          return;
        }

        setMessage(
          "Thank you for your purchase! See your coupons in My Coupons"
        );
        setAlertType("success");
        setIsAlertModalOpen(true);

        const updatedUserData = await fetchUserData();
        setUserData(updatedUserData);
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    fetchUserData().then((data) => setUserData(data));
    // Fetch data from the API endpoint
    fetch("http://localhost:8080/api/coupons")
      .then((response) => response.json())
      .then((data) => setCoupons(data))
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  return (
    <div
      className="bg-cover h-screen flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Coupon Shop</h1>
          <div className="text-2xl font-bold text-white p-4 bg-green-500 rounded-lg">
            Your Points: {userData.points}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto">
          {coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="flex flex-col p-4 bg-gray-100 rounded-lg mb-4 border-2 border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-2">{coupon.product}</h2>
              <p className="mb-2">{coupon.description}</p>
              <p className="font-semibold mb-2">
                Required Points: {coupon.requiredPoints}
              </p>
              {coupon.type === "discount" && (
                <p className="text-orange-500 font-semibold mb-2">
                  Discount: {coupon.discount}% off
                </p>
              )}
              {coupon.type === "free_product" && (
                <p className="text-green-500 font-semibold mb-2">
                  Free product coupon
                </p>
              )}
              <button
                className="mt-auto bg-green-500 text-white rounded-lg p-2"
                onClick={() => buyCoupon(coupon._id)}
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
      <AlertModal
        show={isAlertModalOpen}
        onHide={handleCloseErrorModal}
        messages={[message] ?? []}
        color={alertType === "error" ? "red" : "green"}
        icon={alertType === "error" ? faExclamationCircle : faCheckCircle}
      />
    </div>
  );
};

export default CouponShop;
