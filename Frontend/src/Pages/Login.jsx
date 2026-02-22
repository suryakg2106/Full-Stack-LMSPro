import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import AuthContext from "../Context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  console.log(login,"................")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // role frontend controlled (for now)
      await login({ email, password });
    } catch (err) {
      setError("Invalid email or password",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-center">Welcome Back 👋</h2>
          <p className="text-center text-gray-500 mt-2">
            Login to continue learning
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold
                         hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;