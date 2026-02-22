import React, { useState, useContext } from "react";
import AddCourse from "./AddCourse";
import ViewCourses from "./ViewCourses";
import ViewTeachers from "./ViewTeacher";
import ViewStudents from "./ViewStudents";
import AuthContext from "../../Context/AuthContext";
import {AdminCreateTeacher} from "../../Service/Admin"
import { AdmEnrollments } from "../../Service/Admin";

/* ===================== MAIN DASHBOARD ===================== */

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");
  const { logout } = useContext(AuthContext);

  const renderContent = () => {
    switch (active) {
      case "add-course":
        return <AddCourse />;

      case "courses":
        return <ViewCourses />;

      case "teachers":
        return <ViewTeachers />;

      case "students":
        return <ViewStudents />;

      case "create-teacher":
        return <CreateTeacher />;

      case "enrollments":
        return <Enrollments />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <ul className="space-y-3 flex-1">
          <SidebarItem label="Dashboard" onClick={() => setActive("dashboard")} />
          <SidebarItem label="Add Course" onClick={() => setActive("add-course")} />
          <SidebarItem label="View Courses" onClick={() => setActive("courses")} />
          <SidebarItem label="View Teachers" onClick={() => setActive("teachers")} />
          <SidebarItem label="View Students" onClick={() => setActive("students")} />
          <SidebarItem
            label="Create Teacher Account"
            onClick={() => setActive("create-teacher")}
          />
          <SidebarItem
            label="Enrollments"
            onClick={() => setActive("enrollments")}
          />
        </ul>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </aside>

      {/* ===================== MAIN AREA ===================== */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {active.replace("-", " ")}
          </h1>
          <span className="text-sm text-gray-500">Admin</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

/* ===================== DASHBOARD HOME ===================== */

const DashboardHome = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6 text-gray-800">
      Platform Statistics
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Stat title="Total Courses" value="12" color="blue" />
      <Stat title="Total Teachers" value="5" color="indigo" />
      <Stat title="Total Students" value="120" color="green" />
      <Stat title="Total Enrollments" value="340" color="purple" />
      <Stat title="Live Courses" value="4" color="red" />
      <Stat title="Revenue (₹)" value="1,25,000" color="yellow" />
    </div>
  </div>
);

/* ===================== CREATE TEACHER ===================== */




export const CreateTeacher = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await AdminCreateTeacher(form);

      setSuccess("✅ Teacher account created successfully");
      setForm({ fullname: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Failed to create teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-1 text-gray-800">
        Create Teacher Account
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        Create login credentials for a new instructor
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <input
          type="text"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300
                     bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300
                     bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-300
                     bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500 transition"
        />

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Success */}
        {success && (
          <p className="text-sm text-green-600">{success}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white py-3 rounded-xl font-semibold
                     hover:from-blue-700 hover:to-indigo-700
                     disabled:opacity-60 transition"
        >
          {loading ? "Creating..." : "Create Teacher"}
        </button>
      </form>
    </div>
  );
};

// export default CreateTeacher;

/* ===================== ENROLLMENTS ===================== */
import  { useEffect } from "react";


/* ===================== ENROLLMENTS ===================== */

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await AdmEnrollments();
        setEnrollments(data.data || data);
      } catch (err) {
        console.error(err);
        setError("Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading enrollments...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Course Enrollments
        </h2>
        <p className="text-gray-500 text-sm">
          All student enrollments across courses
        </p>
      </div>

      {/* Empty State */}
      {enrollments.length === 0 && (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-gray-500">No enrollments found.</p>
        </div>
      )}

      {/* Table */}
      {enrollments.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Course</th>
                <th className="px-4 py-3 text-left">Progress</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Enrolled On</th>
              </tr>
            </thead>

            <tbody>
              {enrollments.map((e) => (
                <tr
                  key={e._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Student */}
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">
                      {e.userId?.email}
                    </p>
                  </td>

                  {/* Course */}
                  <td className="px-4 py-3 text-gray-700">
                    {e.courseId?.title}
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-3">
                    <div className="w-32">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-green-500"
                          style={{
                            width: `${e.progress_percentage}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {e.progress_percentage}%
                      </p>
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                      {e.payment_method}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(e.enrollment_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


/* ===================== SIDEBAR ITEM ===================== */

const SidebarItem = ({ label, onClick }) => (
  <li
    onClick={onClick}
    className="cursor-pointer px-3 py-2 rounded-lg
               hover:bg-white/20 transition"
  >
    {label}
  </li>
);

/* ===================== STAT CARD ===================== */

const Stat = ({ title, value, color }) => {
  const colors = {
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    green: "text-green-600",
    purple: "text-purple-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${colors[color]}`}>
        {value}
      </p>
    </div>
  );
};