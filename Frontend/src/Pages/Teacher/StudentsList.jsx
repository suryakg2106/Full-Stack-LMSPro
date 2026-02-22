import React from "react";

const students = [
  {
    id: 1,
    name: "Surya Ghosh",
    email: "surya@gmail.com",
    progress: "75%",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    progress: "60%",
  },
  {
    id: 3,
    name: "Ananya Das",
    email: "ananya@gmail.com",
    progress: "90%",
  },
];

const StudentList = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Enrolled Students</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Student</th>
              <th className="p-4">Email</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${student.name}`}
                    alt={student.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{student.name}</span>
                </td>

                <td className="p-4 text-gray-600">{student.email}</td>

                <td className="p-4">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                    {student.progress}
                  </span>
                </td>

                <td className="p-4">
                  <button className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;