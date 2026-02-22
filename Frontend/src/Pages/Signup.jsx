import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // UI only – no backend
    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Student Signup
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Create password"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Signup
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;