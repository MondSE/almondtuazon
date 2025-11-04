"use client";

import React, { useState } from "react";
import * as motion from "motion/react-client";
import certifications from "@/data/certification.json";
import Link from "next/link";
import { PiCertificate } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";

const Certifications = () => {
  const [showAll] = useState(false);
  const displayedCerts = React.useMemo(() => {
    const sorted = [...certifications].sort((a, b) => b.id - a.id);
    return showAll ? sorted : sorted.slice(0, 4);
  }, [showAll, certifications]);
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <PiCertificate size={24} />
          <h2 className="text-2xl font-bold">Certifications</h2>
        </div>
        <Link href="/certifications">
          <p className="flex items-center gap-1 text-sm hover:underline">
            <IoIosArrowRoundForward className="text-lg" />
            View More
          </p>
        </Link>
      </div>
      <ul className="space-y-4">
        {displayedCerts.map((cert) => (
          <li
            key={cert.id}
            className="dark:bg-gray-800 p-4 border-1 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <Link href={cert.link} target="_blank">
              <h3 className="text-md font-semibold">{cert.title}</h3>
              <p className="text-sm dark:text-gray-400">
                {cert.issuer} · {cert.year}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default Certifications;
