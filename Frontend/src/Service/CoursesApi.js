import Api from "./Api.js";

// 🔹 Fetch all courses
export const fetchCourses = async () => {
  const res = await Api.get("api/teacher/courses");
  return res.data;
};

// Get course by ID
export const fetchCourseById = async (id) => {
  const res = await Api.get(`/api/teacher/course/${id}`);
  return res.data;
};

