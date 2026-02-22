import React, { useEffect, useState } from "react";
import { TeacherOwncourses } from "../../Service/Teacher";
import AddAssignmentModal from "../../Components/addAssiments";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await TeacherOwncourses();
      setCourses(data.data || data);
    };
    fetchCourses();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Assigned Courses</h1>
        <p className="text-gray-500">Manage your courses & assignments</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-40 w-full object-cover rounded-t-2xl"
            />

            <div className="p-5">
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {course.description}
              </p>

              <button
                onClick={() => setSelectedCourse(course)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg
                           hover:bg-indigo-700"
              >
                ➕ Add Assignment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assignment Modal */}
      {selectedCourse && (
        <AddAssignmentModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default TeacherCourses;