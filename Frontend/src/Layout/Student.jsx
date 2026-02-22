import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const StudentLayout = () => {
  return (
    <>
      {/* ✅ Navbar always visible */}
      <Navbar />

      {/* Page Content */}
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default StudentLayout;