import backgroundImage from "../wallpaper/landing-page-wallpaper.jpg";
import "../css/LandingPage-css.css";
import logo from "../logo/ReVapeLogoPng.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="bg-cover h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <img src={logo} alt="Logo" className="mb-10 h-60 mr-3 w-auto glideIn" />{" "}
      <h1 className="text-4xl font-bold mt-4 glideIn text-white">
        Welcome to ReVape
      </h1>
      <p className="text-xl font-bold text-center mt-4 glideIn text-white">
        We're committed to making vaping more sustainable by offering a
        recycling program for vapes
      </p>
      <p className="mt-4 font-bold text-4xl text-center glideIn text-white">
        Join us in making a difference
      </p>
      <div className="mt-7 slideInUp">
        <button>
          <a
            href="login"
            className="bg-green-500 mr-2 hover:bg-green-700 border rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
          >
            Sign In
          </a>
        </button>
        <Link
          to="/register"
          className="inline-block align-baseline font
                        bold text-sm text-green-500 hover:text-green-800"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
