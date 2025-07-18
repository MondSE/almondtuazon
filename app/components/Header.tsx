import React from "react";
import * as motion from "motion/react-client";
import headerData from "@/data/header.json";

const Header = () => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b border-gray-800 gap-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {headerData.map((hed, hedi) => (
        <div key={hedi}>
          <h1 className="text-3xl font-bold">{hed.name}</h1>
          <p className="text-sm text-gray-400 mt-1">@ {hed.location}</p>
          <p className="text-sm text-gray-400">{hed.Position}</p>
        </div>
      ))}
      <div className="flex flex-wrap gap-3">
        {/* <button className="bg-white text-black px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition">
          Schedule a Call
        </button>
        <button className="border border-white px-4 py-2 rounded text-sm font-medium hover:bg-white hover:text-black transition">
          Send Email
        </button> */}
      </div>
    </motion.div>
  );
};

export default Header;
