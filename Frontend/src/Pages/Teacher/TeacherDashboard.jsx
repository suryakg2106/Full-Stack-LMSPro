import React,{ useState } from "react";
import TeacherCourses from "./TeacherCourses";
import TeacherAssignments from "./AddAssiments";
import StudentList from "./StudentsList";

const TeacherDashboard = () => {
  const [active, setActive] = useState("courses");

  const renderContent = () => {
    switch (active) {
      case "assignments":
        return <TeacherAssignments />;
      case "students":
        return <StudentList />;
      default:
        return <TeacherCourses />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Teacher Panel</h2>

        <ul className="space-y-3">
          <li
            onClick={() => setActive("courses")}
            className="cursor-pointer hover:bg-indigo-700 p-2 rounded"
          >
            My Courses
          </li>
          <li
            onClick={() => setActive("assignments")}
            className="cursor-pointer hover:bg-indigo-700 p-2 rounded"
          >
            Assignments
          </li>
          <li
            onClick={() => setActive("students")}
            className="cursor-pointer hover:bg-indigo-700 p-2 rounded"
          >
            Students
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;