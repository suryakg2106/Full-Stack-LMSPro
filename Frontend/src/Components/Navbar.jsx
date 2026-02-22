import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const Navbar = ({ onAuthClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const { user, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "teacher") navigate("/teacher/dashboard");
    else navigate("/student/dashboard");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400"
          >
            LMS<span className="text-gray-800 dark:text-gray-200">Pro</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="nav-link dark:text-gray-200" to="/#hero">Home</Link>
          <Link className="nav-link dark:text-gray-200"
  to="/#courseSection"
 
>
  Courses
</Link>

            {/* 🔐 Logged in */}
            {user ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="px-4 py-2 rounded-full border border-indigo-600
                             text-white font-semibold hover:bg-green-600"
                >
                  My Dashboard
                </button>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white
                             hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest */}
                <button
                  onClick={onAuthClick}
                  className="nav-link dark:text-gray-200"
                >
                  Login
                </button>

                <button
                  onClick={onAuthClick}
                  className="px-5 py-2 rounded-full bg-indigo-600 text-white
                             font-semibold hover:bg-indigo-700 transition"
                >
                  Signup
                </button>
              </>
            )}

            {/* Dark Mode */}
            <button
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setDark(!dark);
              }}
              className="text-xl"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setDark(!dark);
              }}
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-gray-700 dark:text-gray-200"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900
                        border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
          <div className="flex flex-col px-6 py-6 gap-5 text-gray-800 dark:text-gray-200">

            <Link onClick={() => setIsOpen(false)} to="/#hero">Home</Link>
          <Link
  className="nav-link dark:text-gray-200"
  to="/#courseSection"
>
  Courses
</Link>

            {user ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleDashboard();
                  }}
                  className="px-2 py-3 rounded-full border bg-gray-600 border-indigo-600
                             text-white font-semibold hover:bg-green-600"
                >
                  My Dashboard
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="text-left text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onAuthClick();
                  }}
                  className="text-left"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    onAuthClick();
                  }}
                  className="text-left font-semibold text-indigo-600"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;