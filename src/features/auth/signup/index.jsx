import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../../services/axios";
import SecondaryLoader from "../../../components/loaders/SecondaryLoader";
import ROUTES from "../../../navigations/routes";

const Signup = () => {
	const [signup, setSignup] = useState({
		userName: "",
		phoneNo: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setSignup({ ...signup, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage("");
		try {
			setIsLoading(true);
			const res = await axios.post("/api/auth/user-signup", { ...signup });
			const userId = res.data._id;
			localStorage.setItem("userId", userId);
			navigate(`/`);
		} catch (error) {
			console.log(error);
			setErrorMessage(error?.response?.data?.error || "An error occurred while signing up. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex">
			<div className="hidden md:flex md:w-1/2"></div>
			<div className="flex flex-col justify-center items-center md:w-1/2 w-full bg-green-100 p-6">
				<form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Signup</h2>
					{errorMessage && <p className="text-red-600 text-sm text-center mb-3">{errorMessage}</p>}
					<input
						placeholder="Enter Your Username"
						type="text"
						name="userName"
						onChange={handleChange}
						value={signup.userName}
						className="w-full p-3 mb-3 border border-green-300 rounded focus:outline-none focus:border-green-500 bg-white bg-opacity-80"
					/>
					<input
						placeholder="Enter Your Phone Number"
						type="text"
						name="phoneNo"
						onChange={handleChange}
						value={signup.phoneNo}
						className="w-full p-3 mb-3 border border-green-300 rounded focus:outline-none focus:border-green-500 bg-white bg-opacity-80"
					/>
					<input
						placeholder="Enter Your Password"
						type="password"
						name="password"
						onChange={handleChange}
						value={signup.password}
						className="w-full p-3 mb-3 border border-green-300 rounded focus:outline-none focus:border-green-500 bg-white bg-opacity-80"
					/>
					<button
						type="submit"
						className={`w-full bg-green-800 ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} text-white py-2 flex items-center justify-center rounded hover:bg-green-700 transition-all`}
					>
						{isLoading ? "" : "Signup"} <SecondaryLoader isLoading={isLoading} />
					</button>
					<p className="mt-4 text-center text-green-700">
						Already have an account?{" "}
						<Link to={ROUTES.LOGIN} className="text-green-600 hover:underline">
							Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Signup;
