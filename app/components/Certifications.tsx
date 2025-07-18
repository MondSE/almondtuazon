import React from "react";
import * as motion from "motion/react-client";
import certifications from "@/data/certification.json";

const Certifications = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Certifications
      </h2>
      <ul className="space-y-4">
        {certifications.map((cert, idx) => (
          <li key={idx} className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-md font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-400">
              {cert.issuer} · {cert.year}
            </p>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default Certifications;
