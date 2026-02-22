import React from "react";


const TeacherAssignments = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>

      <form className="bg-white p-6 rounded shadow max-w-lg">
        <input
          className="w-full border p-2 mb-4"
          placeholder="Assignment Title"
        />
        <textarea
          className="w-full border p-2 mb-4"
          placeholder="Assignment Description"
        />

        <button className="bg-indigo-600 text-white px-6 py-2 rounded">
          Add Assignment
        </button>
      </form>
    </div>
  );
};

export default TeacherAssignments;