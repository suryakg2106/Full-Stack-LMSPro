import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const isLive = course.courseType === "live";

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md
                 hover:shadow-2xl hover:-translate-y-2
                 transition-all duration-300 border border-gray-100"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-52 w-full object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Course Type Badge */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full text-white
            ${isLive ? "bg-red-500" : "bg-blue-600"}`}
        >
          {isLive ? "LIVE COURSE" : "RECORDED"}
        </span>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 flex flex-col h-full">
        <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
          {course.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {course.description || "Master this skill with expert-led training"}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-800">
            ₹{course.price}
          </span>

          <span className="text-xs text-gray-400">
            Lifetime Access
          </span>
        </div>

        {/* ================= CTA ================= */}
        <Link
          to={`/course/${course._id || course.id}`}
          className="mt-5 inline-flex items-center justify-center gap-2
                     bg-gradient-to-r from-green-500 to-emerald-600
                     text-white py-3 rounded-xl font-semibold
                     hover:from-green-600 hover:to-emerald-700
                     active:scale-95 transition"
        >
          🚀 Enroll Now
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;