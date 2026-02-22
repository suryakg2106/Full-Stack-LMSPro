import React from "react";
import EnrolledCourses from "./EnrollCourses";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 p-6">

      {/* 🎉 Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700">
            👋 Welcome Back, Student!
          </h1>
          <p className="text-gray-600 mt-1">
            Let’s continue your learning adventure 🚀
          </p>
        </div>

        <div className="mt-4 sm:mt-0 bg-white px-6 py-3 rounded-2xl shadow">
          <p className="text-sm text-gray-500">🔥 Learning Streak</p>
          <p className="text-2xl font-bold text-orange-500">7 Days</p>
        </div>
      </div>

      {/* 🌈 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <ColorStatCard
          title="Courses Enrolled"
          value="3"
          emoji="📚"
          bg="from-blue-500 to-indigo-500"
        />

        <ColorStatCard
          title="Courses Completed"
          value="1"
          emoji="🏆"
          bg="from-green-400 to-emerald-500"
        />

        <ColorStatCard
          title="Overall Progress"
          value="65%"
          emoji="🚀"
          bg="from-pink-400 to-rose-500"
        />
      </div>

      {/* 🎓 Enrolled Courses Section */}
      <div className="bg-white/60 backdrop-blur rounded-3xl p-6 shadow-lg">
        <EnrolledCourses />
      </div>
    </div>
  );
};

/* 🌈 Colorful Stat Card */
const ColorStatCard = ({ title, value, emoji, bg }) => (
  <div
    className={`rounded-3xl p-6 text-white shadow-lg
                bg-gradient-to-r ${bg}
                hover:scale-105 transition-transform`}
  >
    <div className="flex items-center justify-between">
      <span className="text-4xl">{emoji}</span>
      <span className="text-3xl font-extrabold">{value}</span>
    </div>

    <p className="mt-4 text-lg font-semibold opacity-90">
      {title}
    </p>
  </div>
);

export default StudentDashboard;