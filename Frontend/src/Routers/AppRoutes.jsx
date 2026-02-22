import React from "react";
import {  Routes, Route } from "react-router-dom";
import  ProtectedRoute  from "./ProtectedRouter";

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import CourseDetalis from "../Pages/CourseDetalis";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import TeacherDashboard from "../Pages/Teacher/TeacherDashboard";
import StudentDashboard from "../Pages/Student/StudentDashboard";
import StudentLayout from "../Layout/Student";
import StudentAssignments from "../Pages/Student/StudentsAssiments";

const AppRoutes = () => {
  return (
    
      <Routes>
        <Route element={<StudentLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetalis />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route
  path="/api/enroll/:courseId/details"
  element={<StudentAssignments />}
/>



        </Route>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course/:id" element={<CourseDetalis />} /> */}

        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
         <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        
      </Routes>
  );
};

export default AppRoutes;