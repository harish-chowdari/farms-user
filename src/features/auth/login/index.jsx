import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"

import axios from "../../../services/axios"
import SecondaryLoader from "../../../components/loaders/SecondaryLoader"
import ROUTES from "../../../navigations/routes"
import Input from "../../../components/fields/Input"
import PrimaryLoader from "../../../components/loaders/PrimaryLoader"

const Login = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            phoneNo: "",
            password: ""
        },
        validationSchema: Yup.object({
            phoneNo: Yup.string().required("Phone Number is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
        }),
        onSubmit: async (values) => {
            setErrorMessage("")
            try {
                setIsLoading(true)
                const res = await axios.post("/api/auth/user-login", values)
                const userId = res.data._id
                localStorage.setItem("userId", userId)
                navigate(`/`)
            } catch (error) {
                setErrorMessage(error?.response?.data?.error || "An error occurred. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }
    })

    return (
        <div className="min-h-screen flex">
            <PrimaryLoader isLoading={isLoading} />
            <div className="hidden md:flex md:w-1/2">
                {/* <img
                    src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg?semt=ais_hybrid"
                    alt="Hospital and Patient"
                    className="w-full h-full object-cover"
                /> */}
            </div>

            {/* Right side login form */}
            <div className="flex flex-col justify-center items-center md:w-1/2 w-full bg-green-100 p-6">
                <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-green-800 text-center mb-4">Login</h2>

                    {errorMessage && (
                        <p className="text-red-600 text-sm text-center mb-3">{errorMessage}</p>
                    )}

                    <Input
                        label="Phone Number"
                        name="phoneNo"
                        type="phoneNo"
                        placeholder="Enter your phone number"
                        formik={formik}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        formik={formik}
                    />

                    <p className="text-sm text-green-700 text-center mb-3">
                        Forgot password? Update{" "}
                        <Link to={ROUTES.SIGNUP} className="text-green-600 hover:underline">
                            here
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className={`w-full bg-green-800 ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"} text-white py-2 flex items-center justify-center rounded hover:bg-green-700 transition-all`}
                    >
                        {isLoading ? "" : "Login"}{" "}
                        <SecondaryLoader isLoading={isLoading} />
                    </button>

                    <p className="mt-4 text-center text-green-700">
                        Don't have an account?{" "}
                        <Link to={ROUTES.SIGNUP} className="text-green-600 hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
