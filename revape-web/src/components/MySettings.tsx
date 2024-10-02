import { useEffect, useState } from "react";
import backgroundImage from "../wallpaper/landing-page-wallpaper.jpg";
import Cookies from "js-cookie";
import AlertModal from "./modals/AlertModal";
import {
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const userId = Cookies.get("userId");

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

function MySettings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [points, setPoints] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleCloseErrorModal = () => {
    setIsAlertModalOpen(false);
    setMessage("");
  };

  const validatePassword = (password: string) => {
    // at least 6 characters
    const re = /.{6,}/;
    return re.test(password);
  };

  const isStrong = (password: string) => {
    // at least 6 characters && at least 1 number && at least 1 uppercase
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);
  };

  const openChangePasswordModal = () => {
    setIsModalOpen(true);
  };

  const closeChangePasswordModal = () => {
    setIsModalOpen(false);
  };

  const handlePasswordModification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = () => {
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 400) {
          setMessage(data.message);
          setAlertType("error");
          setIsAlertModalOpen(true);
          return;
        }

        setMessage("Password changed successfully!");
        setAlertType("success");
        setIsAlertModalOpen(true);
        setIsModalOpen(false);
      });
  };

  useEffect(() => {
    fetchUserData().then((data) => {
      setUsername(data.userName);
      setEmail(data.email);
      setPoints(data.points);
    });
  });

  return (
    <div
      className="bg-cover h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-gray-800 bg-opacity-80 rounded-3xl text-white w-4/5 h-4/5 flex">
        <div className="p-8 w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Hello, <span className="text-green-500">{username}</span>
          </h2>
          <div className="rounded-lg p-4 h-full">
            <div className="mb-4">
              <label
                className="block text-sm ml-3 font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                readOnly
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-[#1a1a1a]"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm ml-3 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                readOnly
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none text-white border rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-[#1a1a1a]"
              />
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-full"
              onClick={openChangePasswordModal}
            >
              I want to change my password
            </button>
            {isModalOpen && (
              <div className="bg-gray-200 p-6 rounded-lg w-full mt-6">
                <h3 className="text-2xl mb-6 ml-3 text-gray-950">
                  Change Password
                </h3>
                <label
                  className="block text-sm font-bold mb-2 ml-3 text-gray-700"
                  htmlFor="password"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter Old Password"
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#1a1a1a]"
                />
                <label
                  className="block text-sm font-bold mb-2 ml-3 mt-3 text-gray-700"
                  htmlFor="password"
                >
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordModification}
                  placeholder="Enter New Password"
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#1a1a1a]"
                />
                {passwordError && (
                  <p className="text-red-500 px-3 text-xs italic">
                    {passwordError}
                  </p>
                )}
                {newPassword.length > 0 && (
                  <p className="text-gray-400 px-3 text-xs italic">
                    Password strength:{" "}
                    {isStrong(newPassword) ? (
                      <span className="text-green-500">Strong</span>
                    ) : (
                      <span className="text-red-500">Weak</span>
                    )}
                  </p>
                )}
                <button
                  className="bg-green-500 hover:bg-green-700 mt-4 text-white font-bold py-2 px-4 rounded-full w-full"
                  onClick={handlePasswordChange}
                >
                  Save New Password
                </button>
                <button
                  className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full"
                  onClick={closeChangePasswordModal}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-green-500 rounded-r-3xl p-6 text-white w-1/3 flex items-center justify-center shadow-lg">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-2">{points}</h2>
            <p className="text-xl font-semibold">Points</p>
          </div>
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
}
export default MySettings;
