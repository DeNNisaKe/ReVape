import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import backgroundImage from "../wallpaper/landing-page-wallpaper.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return email.length && re.test(email);
  };

  const validatePassword = (password: string) => {
    // at least 6 characters
    const re = /.{6,}/;
    return re.test(password);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authToken) {
          Cookies.set("authToken", data.authToken);
          Cookies.set("role", data.role);
          Cookies.set("userId", data._id);
          navigate("/main");
          window.location.reload();
        } else {
          console.log(data.error);
        }
      });
  };

  return (
    <div
      className="bg-cover h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 bg-opacity-50 text-white rounded-lg p-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-200 px-3 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#1a1a1a]"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && (
            <p className="text-red-500 px-3 text-xs italic">{emailError}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-200 px-3 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#1a1a1a]"
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p className="text-red-500 px-3 text-xs italic">{passwordError}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 border rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
