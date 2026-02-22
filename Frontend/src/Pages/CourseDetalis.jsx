import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { fetchCourseById } from "../Service/CoursesApi";
import { StudentEnroll } from "../Service/Student";

/* ===================== COURSE DETAILS ===================== */

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showPayment, setShowPayment] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  /* 🔹 Load Course */
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourse(data.data || data);
      } catch (err) {
        console.error(err);
        setError("Course not found");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  /* 🔹 Enroll Handler */
  const handleEnroll = async () => {
    try {
      setPayLoading(true);
      await StudentEnroll(course.course._id);

      setShowPayment(false);
      alert("✅ Enrollment Successful!");

      navigate("/student/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Enrollment failed");
    } finally {
      setPayLoading(false);
    }
  };

  /* 🔹 Loading */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center text-lg font-semibold text-gray-600">
          🎨 Loading course details...
        </div>
      </>
    );
  }

  /* 🔹 Error */
  if (error || !course) {
    return (
      <>
        <Navbar />
        <div className="pt-32 text-center text-red-500 font-semibold">
          {error || "Course not found"}
        </div>
      </>
    );
  }

  const c = course.course;

  return (
    <>
      <Navbar />

      {/* 🌈 PAGE BACKGROUND */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* 🖼️ THUMBNAIL */}
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-10">
            <img
              src={c.thumbnail}
              alt={c.title}
              className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover"
            />
          </div>

          {/* 🧠 COURSE CARD */}
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-700">
                {c.title}
              </h1>

              <span
                className={`px-5 py-2 rounded-full text-sm font-bold text-white
                  ${c.courseType === "live" ? "bg-red-500" : "bg-blue-500"}`}
              >
                {c.courseType === "live" ? "🔥 LIVE COURSE" : "🎥 RECORDED COURSE"}
              </span>
            </div>

            <p className="mt-6 text-gray-700 text-base sm:text-lg leading-relaxed">
              {c.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-center gap-4">
              <div className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl
                              text-xl font-bold shadow">
                💰 ₹{c.price}
              </div>

              <div className="text-sm text-gray-500">
                ✔ Lifetime Access <br />
                ✔ Certificate Included 🎓
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {c.courseType === "live" ? (
                <a
                  href={c.liveClassLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 text-white text-center
                             py-4 rounded-2xl text-lg font-semibold
                             hover:bg-green-700 transition"
                >
                  🎥 Join Live Class
                </a>
              ) : (
                <a
                  href={c.videoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white text-center
                             py-4 rounded-2xl text-lg font-semibold
                             hover:bg-blue-700 transition"
                >
                  ▶ Watch Preview
                </a>
              )}

              <button
                onClick={() => setShowPayment(true)}
                className="bg-gradient-to-r from-pink-500 to-rose-500
                           text-white py-4 rounded-2xl text-lg font-semibold
                           hover:scale-105 transition shadow-lg"
              >
                ⚡ Enroll Now
              </button>
            </div>
          </div>

          {/* 📝 ASSIGNMENTS */}
          {course.assignments?.length > 0 && (
            <div className="mt-12 bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-6">
                📝 Assignments
              </h2>

              <div className="space-y-4">
                {course.assignments.map((a, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 border rounded-xl p-4
                               flex flex-col sm:flex-row
                               sm:items-center sm:justify-between gap-2"
                  >
                    <span className="font-medium text-gray-700">
                      {a.title}
                    </span>
                    <span className="text-xs text-gray-500">
                      ⏰ Due: {new Date(a.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 💳 PAYMENT POPUP */}
      {showPayment && (
        <PaymentPopup
          onClose={() => setShowPayment(false)}
          onPay={handleEnroll}
          loading={payLoading}
        />
      )}
    </>
  );
};

export default CourseDetails;

/* ===================== PAYMENT POPUP ===================== */

const PaymentPopup = ({ onClose, onPay, loading }) => (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        💳 Complete Payment
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Secure payment via Razorpay
      </p>

      <div className="border rounded-xl p-4 flex items-center gap-4 mb-6">
        <img
          src="https://razorpay.com/assets/razorpay-glyph.svg"
          alt="Razorpay"
          className="w-10 h-10"
        />
        <span className="font-semibold text-gray-700">
          Razorpay (UPI / Card / NetBanking)
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 border py-3 rounded-xl font-medium
                     hover:bg-gray-50 transition"
        >
          Cancel
        </button>

        <button
          onClick={onPay}
          disabled={loading}
          className="flex-1 bg-indigo-600 text-white
                     py-3 rounded-xl font-semibold
                     hover:bg-indigo-700 transition
                     disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  </div>
);