import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#060f1e] via-[#0b1f33] to-[#020817] text-gray-300">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT : CONTACT INFO */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Get In Touch
          </h2>

          <div className="space-y-5 text-sm">

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-indigo-400 mt-1" />
              <span>+91 908645322947</span>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-indigo-400 mt-1" />
              <span>suryakg2106@gmail.com</span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-indigo-400 mt-1" />
              <span>
                Cyber City, WeWork DLF Forum, <br />
                DLF Phase 3, Gurugram, Haryana 122002
              </span>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-8">
            <a className="hover:text-white" href="#"><FaLinkedinIn /></a>
            <a className="hover:text-white" href="#"><FaInstagram /></a>
            <a className="hover:text-white" href="#"><FaTwitter /></a>
            <a className="hover:text-white" href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* RIGHT : MAP */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Cyber%20City%20DLF%20Phase%203%20Gurugram&output=embed"
            className="w-full h-80 border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © 2024–2026, Surya Kanta Ghosh. All rights reserved.
      </div>

      {/* ================= WHATSAPP FLOAT ================= */}
      <a
        href="https://wa.me/91908645322947"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 p-4 rounded-full
                   text-white shadow-xl hover:scale-110 transition z-50"
      >
        <FaWhatsapp size={22} />
      </a>
    </footer>
  );
};

export default Footer;