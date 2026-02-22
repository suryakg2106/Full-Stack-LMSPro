import React, { useEffect, useState } from "react";
import { StudentEnroolcourses } from "../../Service/Student";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const data = await StudentEnroolcourses();
        setCourses(data?.data || data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolled();
  }, []);

  /* ===================== STATES ===================== */

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading your courses...
        </p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        {error}
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">

      {/* ================= HEADER ================= */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          My Learning
        </h2>
        <p className="text-gray-500 mt-1">
          Continue where you left off
        </p>
      </div>

      {/* ================= EMPTY ================= */}
      {courses.length === 0 && (
        <div className="bg-white rounded-3xl shadow p-12 text-center">
          <p className="text-gray-500 text-lg">
            You haven’t enrolled in any course yet.
          </p>
        </div>
      )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((item) => {
          const course = item?.courseId;

          /* 🔐 SAFETY GUARD */
          if (!course) {
            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow p-6 text-center"
              >
                <p className="text-gray-500 text-sm">
                  ⚠️ This course is no longer available.
                </p>
              </div>
            );
          }

          return (
            <div
              key={item._id}
              className="group bg-white rounded-3xl shadow
                         hover:shadow-2xl transition
                         overflow-hidden flex flex-col"
            >
              {/* ================= IMAGE ================= */}
              <div className="relative">
                <img
                  src={course.thumbnail || "/placeholder-course.png"}
                  alt={course.title}
                  className="h-48 w-full object-cover
                             group-hover:scale-105 transition duration-300"
                />

                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full
                    ${
                      course.courseType === "live"
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                >
                  {course.courseType === "live" ? "LIVE" : "RECORDED"}
                </span>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                  {course.title}
                </h3>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{item.progress_percentage || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-green-500 transition-all"
                      style={{ width: `${item.progress_percentage || 0}%` }}
                    />
                  </div>
                </div>

                {/* ================= ACTIONS ================= */}
                <div className="mt-6 flex flex-col gap-3">
                  {course.courseType === "live" ? (
                    <a
                      href={course.liveClassLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-green-600 text-white text-center
                                 py-2.5 rounded-xl font-medium
                                 hover:bg-green-700 transition"
                    >
                      🎥 Join Live Class
                    </a>
                  ) : (
                    <a
                      href={course.videoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-blue-600 text-white text-center
                                 py-2.5 rounded-xl font-medium
                                 hover:bg-blue-700 transition"
                    >
                      ▶ Continue Learning
                    </a>
                  )}

                  <button
                    onClick={() =>
                      navigate(`/api/enroll/${course._id}/details`)
                    }
                    className="w-full bg-indigo-600 text-white
                               py-2.5 rounded-xl font-medium
                               hover:bg-indigo-700 transition"
                  >
                    📄 View Assignments
                  </button>
                </div>

                {/* Payment */}
                <p className="mt-4 text-xs text-gray-400 text-right">
                  Payment via {item.payment_method}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCourses;