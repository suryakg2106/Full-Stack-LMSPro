import Api from "./Api.js"

// Teacher View own courses
export const TeacherOwncourses = async () => {
  const res = await Api.get("api/teacher/assigned");
  return res.data; 
};

// Teacher create assignment
export const TeacherCreateAssignment = async (payload) => {
  const res = await Api.post("api/assignments", payload);
  return res.data;
};


