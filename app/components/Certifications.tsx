"use client";

import React, { useState } from "react";
import * as motion from "motion/react-client";
import certifications from "@/data/certification.json";
import Link from "next/link";

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedCerts = showAll ? certifications : certifications.slice(0, 4);

  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Certifications
      </h2>
      <ul className="space-y-4">
        {displayedCerts.map((cert, idx) => (
          <li key={idx} className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-md font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-400">
              {cert.issuer} · {cert.year}
            </p>
          </li>
        ))}
        <Link href={"/certifications"}>
          <p className="mt-4 text-sm text-blue-400 hover:underline">
            View More
          </p>
        </Link>
      </ul>
    </motion.section>
  );
};

export default Certifications;
