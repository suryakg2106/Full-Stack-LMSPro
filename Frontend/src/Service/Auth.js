import Api from "./Api.js"

export const Login = async ({ email, password }) => {
  const res = await Api.post("api/auth/login", {
    email,
    password,
  });
  return res.data;
};

// 📝 Register
export const Register = async (cred) => {
  const res = await Api.post("api/auth/register", cred);
  return res.data;
};
// 👤 Check current user (cookie/session)
export const AuthMe = async () => {
  const res = await Api.get("api/auth/me");
  return res.data;
};

// 🚪 Logout
export const Logout = async () => {
  const res = await Api.post("api/auth/logout");
  return res.data;
};