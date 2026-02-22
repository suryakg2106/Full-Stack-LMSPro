import Api from "./Api.js"

// Admin View All courses
export const AdviewCourses = async () => {
  const res = await Api.get("api/teacher/courses");
  return res.data; 
};

// Admin Create Course
export const AdCreateCourse = async (payload) => {
  const res = await Api.post("api/admin/create-course", payload);
  return res.data;
};

// Admin view all Teacher 
export const AdmAllTeacher = async () => {
  const res = await Api.get("api/admin/teachers");
  return res.data; // can be [] or { data: [] }
};

// Admin view all students
export const AdminAllStudent = async ()=>{
  const res = await Api.get("api/admin/students");
  return res.data;
}

// Admin create Teacher account
export const AdminCreateTeacher = async (payload) => {
  const res = await Api.post("api/admin/create-teacher", payload);
  return res.data;
};


export const AdmEnrollments = async () => {
  const res = await Api.get("api/admin/enrollments");
  return res.data;
};