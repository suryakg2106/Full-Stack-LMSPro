import React, { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";

const AuthPopup = ({ onClose }) => {
  const { login, register } = useContext(AuthContext);

  const [mode, setMode] = useState("login");
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({ fullname, email, password });
      }
      onClose();
    }catch (err) {
  setError(
    err.response?.data?.message || "Something went wrong. Please try again."
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 relative animate-scaleIn shadow-xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {mode === "login" ? "Welcome Back 👋" : "Create your account 🚀"}
        </h2>

        <p className="text-center text-gray-500 text-sm mt-2">
          {mode === "login"
            ? "Login to continue learning"
            : "Join thousands of learners on our platform"}
        </p>

        {/* Error */}
        {error && (
          <p className="text-center text-sm text-red-500 mt-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Name (Signup only) */}
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullname}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold
                       hover:bg-indigo-700 active:scale-95 transition-all
                       disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* Switch */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>
              New here?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPopup;