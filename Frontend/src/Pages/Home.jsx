import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import CourseCard from "../Components/CoursesCard";
import { fetchCourses } from "../Service/CoursesApi";
import AuthPopup from "./AuthPopoup";
import Footer from "../Components/Footer";

/* ================== SMALL UI COMPONENTS ================== */

const StatCircle = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 rounded-full border-4 border-green-400
                    flex items-center justify-center text-lg font-bold">
      {value}
    </div>
    <p className="mt-2 text-sm text-gray-200">{label}</p>
  </div>
);

const ProgressRow = ({ title, value }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span>{title}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
      <div className="h-2 bg-green-400" style={{ width: `${value}%` }} />
    </div>
  </div>
);

/* ================== MAIN HOME ================== */

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAuth, setOpenAuth] = useState(false);

  const location = useLocation();

  /* 🔹 FETCH COURSES */
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data.data || data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  /* 🔹 AUTO SCROLL WHEN URL HAS #courseSection */
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);

  /* 🔹 HERO BUTTON SCROLL */
  const scrollToCourses = () => {
    const el = document.getElementById("courseSection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar onAuthClick={() => setOpenAuth(true)} />

      {/* ================= HERO SECTION ================= */}
      <section id="hero" className="pt-28 pb-20 bg-gradient-to-br from-[#0f2a44] via-[#123b5c] to-[#0b1f33] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-yellow-400 text-black text-sm font-semibold">
              🚀 Transform Your Career Today
            </span>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight">
              Bridge The Gap <br />
              <span className="text-indigo-400">Between College</span> <br />
              & Your Career
            </h1>

            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              Live learning with industry experts, real-world projects,
              and job-ready skills — all in one LMS platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setOpenAuth(true)}
                className="bg-white text-blue-700 px-8 py-3 rounded-xl
                           font-semibold hover:scale-105 transition"
              >
                Explore Programs
              </button>

              <button
                onClick={scrollToCourses}
                className="border border-white/40 px-8 py-3 rounded-xl
                           font-semibold hover:bg-white/10 transition"
              >
                View Courses
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute -top-6 right-6 bg-green-500 text-white
                            px-4 py-2 rounded-xl shadow-lg text-sm font-semibold">
              ✅ Assignment Completed
            </div>

            <div className="bg-[#173a5e] rounded-3xl p-8 shadow-2xl">
              <h3 className="text-lg font-semibold mb-6">
                Your Program Dashboard
              </h3>

              <div className="flex gap-6 mb-6">
                <StatCircle label="Web Dev" value="85%" />
                <StatCircle label="Data Science" value="72%" />
              </div>

              <ProgressRow title="Profile Completed" value={80} />
              <ProgressRow title="Assignment Completed" value={75} />
              <ProgressRow title="Project Submitted" value={90} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section
        id="courseSection"
        className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-16"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
          Available Courses
        </h2>

        {loading && (
          <p className="text-center text-gray-600">Loading courses...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course._id || course.id}
              course={course}
            />
          ))}
        </div>
      </section>
      <Footer/>

      {/* ================= AUTH POPUP ================= */}
      {openAuth && <AuthPopup onClose={() => setOpenAuth(false)} />}
    </>
  );
};

export default Home;