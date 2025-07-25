import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../../services/axios";
import SecondaryLoader from "../../../components/loaders/SecondaryLoader";
import ROUTES from "../../../navigations/routes";

const PasswordReset = () => {
  const [login, setLogin] = useState({ email: "", otp: "", newPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isOTPSent) {
      try {
          setIsLoading(true);
          const res = await axios.post("/send-admin-otp", { email: login.email });
          alert("OTP has been sent to your email. Please check your inbox.");
          setIsOTPSent(true);
      } catch (error) {
          console.log(error);
          setErrorMessage( error?.response?.data?.error || "An error occurred. Please try again.");
      } finally {
          setIsLoading(false);
      }
    } else {
      try {
          setIsLoading(true);
          const res = await axios.post("/update-admin-password", {
            email: login.email,
            otp: login.otp,
            newPassword: login.newPassword,
          });
          alert("Password updated successfully! You can now log in.");
          navigate("/");
      } catch (error) {
          console.log(error);
          setErrorMessage( error?.response?.data?.error || "An error occurred while updating the password.");
      } finally {
          setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg text-center"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4">Password Reset</h2>
        {errorMessage && <p className="text-red-600 text-sm mb-3">{errorMessage}</p>}

        <input
          placeholder="Enter Your Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={login.email}
          className="w-full p-3 mb-3 border border-green-300 rounded focus:outline-none focus:border-green-500 bg-white bg-opacity-80"
          required
        />

        {isOTPSent && (
          <>
            <input
              placeholder="Enter OTP"
              type="text"
              name="otp"
              onChange={handleChange}
              value={login.otp}
              className="w-full p-3 mb-3 border border-green-300 rounded focus:outline-none focus:border-green-500 bg-white bg-opacity-80"
              required
            />

            <input
              placeholder="Enter New Password"
              type="password"
              name="newPassword"
              onChange={handleChange}
              value={login.newPassword}
              className="w-full p-3 mb-3 border border-green-300 rounded focus:outline-none focus:border-green-500 bg-white bg-opacity-80"
              required
            />
          </>
        )}

        <button
          type="submit"
          className={`w-full bg-green-800 text-white flex items-center justify-center py-2 rounded hover:bg-green-700 transition ${
            isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
          disabled={isLoading}
        >
          {isOTPSent ? isLoading ? 
          <SecondaryLoader isLoading={isLoading} /> : "Reset Password" : isLoading ? 
          <SecondaryLoader isLoading={isLoading} /> : "Send OTP"}
        </button>

        <p className="mt-4 text-green-700">
          Remember your password?{" "}
          <Link to={ROUTES.LOGIN} className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PasswordReset;
