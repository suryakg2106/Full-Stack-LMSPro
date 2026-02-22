import React, { useEffect, useState } from "react";
import { AdminAllStudent } from "../../Service/Admin.js";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await AdminAllStudent();
        setStudents(data.data || data);
      } catch (err) {
        console.error(err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading students...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <p className="text-gray-500 text-sm">
          List of all registered students
        </p>
      </div>

      {/* Table Card */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Student</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Avatar + Name */}
                <td className="px-6 py-4 flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full
                               bg-gradient-to-br from-green-400 to-emerald-500
                               text-white flex items-center justify-center
                               font-semibold text-lg"
                  >
                    {student.name?.charAt(0) || "S"}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {student.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Student
                    </p>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-gray-600">
                  {student.email}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-center">
                  <button
                    className="px-4 py-1.5 rounded-full text-sm font-medium
                               text-blue-600 bg-blue-50
                               hover:bg-blue-100 transition"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No students found.
        </p>
      )}
    </div>
  );
};

export default ViewStudents;