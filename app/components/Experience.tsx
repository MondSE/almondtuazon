import React from "react";
import * as motion from "motion/react-client";
import experinces from "@/data/experince.json";

const Experience = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Experience
      </h2>
      <div className="space-y-6">
        {experinces.map((exp, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded">
            <h3 className="text-sm font-semibold">{exp.title}</h3>
            <p className="text-sm text-yellow-400">{exp.company}</p>
            <p className="text-sm text-gray-300 mt-1">{exp.year}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
