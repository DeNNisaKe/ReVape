import React, { useEffect, useState } from "react";
import backgroundImage from "../wallpaper/landing-page-wallpaper.jpg";
import Cookies from "js-cookie";
import { MyCoupons as MyCouponsType } from "../models/couponModel";

const MyCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<MyCouponsType[]>([]);

  const userId = Cookies.get("userId");

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(`http://localhost:8080/api/coupons/${userId}`)
      .then((response) => response.json())
      .then((data: MyCouponsType[]) => setCoupons(data))
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);

  return (
    <div
      className="bg-cover h-screen flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-8">My Coupons</h1>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 overflow-auto">
        {coupons.map((item) => (
          <div
            key={item._id}
            className="flex flex-col p-4 bg-gray-100 rounded-lg mb-4 border-2 border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-2">{item.coupon.product}</h2>
            <p className="mb-2">{item.coupon.description}</p>
            <p className="font-semibold mb-2">
              Required Points: {item.coupon.requiredPoints}
            </p>
            {item.coupon.type === "discount" && (
              <p className="text-orange-500 font-semibold mb-2">
                Discount: {item.coupon.discount}% off
              </p>
            )}
            {item.coupon.type === "free_product" && (
              <p className="text-green-500 font-semibold mb-2">
                Free product coupon
              </p>
            )}
            <p className="font-semibold mb-2">
              Number of Coupons: {item.couponsNumber}
            </p>
            <div className="font-semibold mb-2">
              Coupon codes:
              {item.couponCodes.map((code, index) => (
                <div
                  key={index}
                  className="inline-block ml-2 p-2 mt-2 bg-green-300 rounded-lg"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCoupons;
