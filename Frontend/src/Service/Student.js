import Api from "./Api.js"

// Student View Enroll courses
export const StudentEnroolcourses = async () => {
  const res = await Api.get("api/enroll/my-courses");
  return res.data; 
};

// Student View Enrolled Course Assignments
// export const StudentAssignments = async (courseId) => {
//   const res = await Api.get(`api/enroll/${courseId}/details`);
//   return res.data;
// };

//Student enroll
export const StudentEnroll = async (courseId, payment_method = "razorpay") => {
  const res = await Api.post("api/enroll/course", {
    courseId,
    payment_method,
  });
  return res.data;
};