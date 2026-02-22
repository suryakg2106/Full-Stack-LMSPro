import React, { useState } from "react";
import { AdCreateCourse } from "../../Service/Admin";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    courseType: "recorded",
    videoLink: "",
    liveClassLink: "",
    teacherId: "",
    thumbnail: "",
  });

  // 🔹 Common premium input style
  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 " +
    "placeholder-gray-400 text-gray-800 " +
    "focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 " +
    "hover:border-gray-400 transition-all duration-200";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      courseType: "recorded",
      videoLink: "",
      liveClassLink: "",
      teacherId: "",
      thumbnail: "",
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    price: Number(form.price),
    liveClassLink:
      form.courseType === "live" ? form.liveClassLink : null,
    videoLink:
      form.courseType === "recorded" ? form.videoLink : null,
  };

  try {
    const res = await AdCreateCourse(payload);
    console.log("COURSE CREATED 👉", res);

    alert("✅ Course created successfully");
    handleReset();
  } catch (error) {
    console.error("CREATE COURSE ERROR 👉", error);
    alert("❌ Failed to create course");
  }

    console.log("COURSE PAYLOAD 👉", payload);
    alert("Course added (check console)");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add New Course
        </h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Create and publish a new course on your LMS platform
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8
                   grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Card Title */}
        <div className="md:col-span-2 border-b pb-4 mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Course Information
          </h3>
          <p className="text-sm text-gray-500">
            Fill all required details carefully
          </p>
        </div>

        {/* LEFT */}
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Frontend Development with React"
              className={inputStyle}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              This will appear as the main course heading
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="HTML, CSS, JavaScript, React from basics to advanced"
              className={`${inputStyle} resize-none`}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Price (₹)
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="1599"
              className={inputStyle}
              required
            />
          </div>

          {/* Course Type Pills */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Course Type
            </label>
            <div className="flex gap-3 flex-wrap">
              {["recorded", "live"].map((type) => (
                <label
                  key={type}
                  className={`px-4 py-2 rounded-xl border cursor-pointer transition
                    ${
                      form.courseType === type
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="radio"
                    name="courseType"
                    value={type}
                    checked={form.courseType === type}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {type === "recorded" ? "🎥 Recorded" : "📡 Live"}
                </label>
              ))}
            </div>
          </div>

          {form.courseType === "recorded" && (
            <input
              name="videoLink"
              value={form.videoLink}
              onChange={handleChange}
              placeholder="Video playlist link"
              className={inputStyle}
              required
            />
          )}

          {form.courseType === "live" && (
            <input
              name="liveClassLink"
              value={form.liveClassLink}
              onChange={handleChange}
              placeholder="Live class link"
              className={inputStyle}
              required
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Thumbnail Image URL
            </label>
            <input
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className={inputStyle}
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Recommended size: 16:9
            </p>
          </div>

          {form.thumbnail && (
            <div className="rounded-xl overflow-hidden border">
              <img
                src={form.thumbnail}
                alt="Preview"
                className="w-full h-40 sm:h-48 object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Teacher ID
            </label>
            <input
              name="teacherId"
              value={form.teacherId}
              onChange={handleChange}
              placeholder="Teacher MongoDB ID"
              className={inputStyle}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl border border-gray-300
                         text-gray-600 hover:bg-gray-50 transition"
            >
              Reset
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         text-white px-8 py-3 rounded-xl font-semibold shadow-md
                         hover:from-blue-700 hover:to-indigo-700
                         active:scale-95 transition-all"
            >
              ➕ Add Course
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;