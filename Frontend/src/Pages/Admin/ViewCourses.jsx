import React, { useEffect, useState } from "react";
import  {AdviewCourses}  from "../../Service/Admin";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await AdviewCourses();

        // 🔹 backend may send { data: [] } or []
        setCourses(data.data || data);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Courses</h2>
        <p className="text-gray-500 text-sm">
          Manage and review all published courses
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Course */}
                <td className="px-4 py-3 flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {course.description}
                    </p>
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        course.courseType === "live"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                  >
                    {course.courseType}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4 py-3 font-semibold text-gray-700">
                  ₹{course.price}
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="px-4 py-3 text-center">
                  <button className="text-blue-600 hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty */}
      {courses.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No courses found.
        </p>
      )}
    </div>
  );
};

export default ViewCourses;