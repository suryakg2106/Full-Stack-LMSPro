import React, { useEffect, useState } from "react";
import { AdmAllTeacher } from "../../Service/Admin"; 


const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await AdmAllTeacher();

        // backend may return { data: [] } or []
        setTeachers(data.data || data);
      } catch (err) {
        console.error(err);
        setError("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading teachers...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
        <p className="text-gray-500 text-sm">
          Manage all instructors on the platform
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Teacher</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Expertise</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((teacher) => (
              <tr
                key={teacher._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Avatar + Name */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-blue-100 text-blue-600
                               flex items-center justify-center font-bold"
                  >
                    {teacher.name?.charAt(0) || "T"}
                  </div>
                  <span className="font-medium text-gray-800">
                    {teacher.name}
                  </span>
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-gray-600">
                  {teacher.email}
                </td>

                {/* Expertise */}
                <td className="px-4 py-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium
                                   bg-indigo-100 text-indigo-600">
                    {teacher.expertise || "Instructor"}
                  </span>
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

      {/* Empty State */}
      {teachers.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No teachers found.
        </p>
      )}
    </div>
  );
};

export default ViewTeachers;