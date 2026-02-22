import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Service/Api";

const StudentAssignments = () => {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await Api.get(`api/enroll/${courseId}/details`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading assignments...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">

      {/* 🔹 Course Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8
                      flex flex-col sm:flex-row gap-6">
        <img
          src={data.course.thumbnail}
          alt={data.course.title}
          className="w-full sm:w-56 h-36 object-cover rounded-xl"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {data.course.title}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {data.course.description}
          </p>

          {/* Progress */}
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-2 bg-green-500"
                style={{ width: `${data.progress_percentage}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {data.progress_percentage}% course completed
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Section Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Assignments
        </h3>
        <span className="text-sm text-gray-500">
          Total: {data.assignments.length}
        </span>
      </div>

      {/* 🔹 Empty State */}
      {data.assignments.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500">
            No assignments available yet.
          </p>
        </div>
      )}

      {/* 🔹 Assignment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.assignments.map((a, index) => (
          <div
            key={a._id}
            className="bg-white rounded-2xl shadow
                       hover:shadow-lg transition
                       p-6 flex flex-col justify-between"
          >
            {/* Top */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full
                                 bg-indigo-100 text-indigo-600">
                  Assignment {index + 1}
                </span>

                <span className="text-xs text-red-500 font-medium">
                  Due {new Date(a.dueDate).toLocaleDateString()}
                </span>
              </div>

              <h4 className="text-lg font-semibold text-gray-800">
                {a.title}
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                {a.description}
              </p>
            </div>

            {/* Action */}
            <button
              className="mt-6 w-full bg-gradient-to-r
                         from-blue-600 to-indigo-600
                         text-white py-2.5 rounded-xl
                         font-semibold shadow
                         hover:from-blue-700 hover:to-indigo-700
                         active:scale-95 transition"
            >
              📤 Submit Assignment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAssignments;