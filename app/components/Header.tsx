import React from "react";
import * as motion from "motion/react-client";
import Image from "next/image"; // ✅ Next.js optimized image
import headerData from "@/data/header.json";

const basePath = process.env.NODE_ENV === "production" ? "/almondtuazon" : "";

const withBasePath = (src: string) => {
  if (!src) return "";
  if (src.startsWith("http")) return src; // external links untouched
  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
};

const Header = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center md:items-center justify-between py-10 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Left side: Profile + Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
        {/* Profile Image */}
        <Image
          src={withBasePath(headerData.profilepicture)}
          alt="Profile Photo"
          width={120}
          height={120}
          className="rounded-3xl shadow-lg object-cover"
        />

        {/* Header Info */}
        {headerData.data.map((hed, hedi) => (
          <div key={hedi}>
            <h1 className="text-3xl md:text-3xl font-bold">{hed.name}</h1>
            <p className="text-sm md:text-sm dark:text-gray-400 mt-2">
              @ {hed.location}
            </p>
            <p className="text-sm md:text-sm dark:text-gray-400">
              {hed.Position}
            </p>
          </div>
        ))}
      </div>
      {/* CV Button aligned right on desktop, below on mobile */}
      <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
        <a
          href="/asset/CV.pdf"
          download="AlmondCV.pdf"
          className="dark:bg-gray-700 dark:text-white text-xs px-4 py-1 dark:border-amber-50 border-2 rounded shadow hover:scale-105 transition-transform hover:bg-gray-300"
        >
          Download CV
        </a>
      </div>
    </motion.div>
  );
};

export default Header;
