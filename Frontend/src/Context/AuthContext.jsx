import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Login as LoginApi,
  Register as RegisterApi,
  AuthMe,
  Logout as LogoutApi,
} from "../Service/Auth.js";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔍 Check session from cookie
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await AuthMe(); // cookie sent automatically
        setUser(res.user);

        // ✅ user logged in but role missing
        if (res.user && !localStorage.getItem("role")) {
          localStorage.setItem("role", "student");
          setRole("student");
        }
      } catch (error) {
        setUser(null);
        setRole(null);
        localStorage.removeItem("role");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // 🔐 Login (cookie based)
const login = async ({ email, password }) => {
  try {
    await LoginApi({ email, password });

    const res = await AuthMe();
    setUser(res.user);

    const role = res.user.role;
   localStorage.setItem("role", role);
    navigate(`/${role}/dashboard`);
  } catch (error) {
    console.error("LOGIN ERROR 👉", error.response?.data || error.message);
    throw error; // 🔥 very important
  }
};

//Register
 const register = async ({ fullname, email, password }) => {
  try {
    await RegisterApi({ fullname, email, password });

    const res = await AuthMe();
    setUser(res.user);

    alert("Registered successfully 🎉");
    navigate("/student/dashboard");
  } catch (error) {
    console.error("Register failed", error.response?.data || error.message);
    throw error;
  }
};

  // 🚪 Logout (cookie destroy)
  const logout = async () => {
    try {
      await LogoutApi(); // backend clears cookie
      setUser(null);
      setRole(null);
      localStorage.removeItem("role");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, role, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;