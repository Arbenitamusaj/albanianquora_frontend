import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { showToast } from "../../components/Notify";

export default function Register() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = {
      FirstName: formData.get("firstName"),
      LastName: formData.get("lastName"),
      Email: formData.get("email"),
      Password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:5274/api/user/register",
        user
      );
      console.log(response.data);
      router.push("/auth/login");
      showToast("User registered successfully!", "success");
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Failed to register user!", "error");
    }
  };

  return (
    <>
      <div className="w-full  bg-gray-200 ">
        <div className="flex flex-col text-center items-center justify-center px-6 py-8 mx-auto lg:py-0 shadow-xl ">
          <div className="w-full bg-white rounded-lg shadow dark:border text-black md:mt-10 sm:max-w-md xl:p-0 mb-10 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-xl ">
                Register your account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-4"
                action="#"
              >
                <div className="text-left">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Enter your Fist Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-1.5"
                    placeholder="First Name"
                    required=""
                  />
                </div>
                <div className="text-left">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Enter your Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-1.5"
                    placeholder="Last Name"
                    required=""
                  />
                </div>
                <div className="text-left">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-1.5"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div className="text-left">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-1.5"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white border-2 border-gray-600 hover:bg-white bg-gray-600 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 border hover:text-black"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-gray-600 hover:underline "
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
