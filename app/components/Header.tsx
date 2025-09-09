import React from "react";
import * as motion from "motion/react-client";
import headerData from "@/data/header.json";

const Header = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-10 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {headerData.map((hed, hedi) => (
        <div key={hedi}>
          <h1 className="text-3xl font-bold">{hed.name}</h1>
          <p className="text-sm dark:text-gray-400 mt-1">@ {hed.location}</p>
          <p className="text-sm dark:text-gray-400">{hed.Position}</p>
        </div>
      ))}

      <div className="flex flex-wrap gap-3">
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
