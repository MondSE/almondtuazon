"use client";

import React, { useState } from "react";
import * as motion from "motion/react-client";
import experinces from "@/data/experince.json";
import { BsGraphUpArrow } from "react-icons/bs";

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState<null | (typeof experinces)[0]>(
    null
  );

  return (
    <>
      <motion.section
        className="bento-card p-4 col-span-1 md:col-span-2 md:row-span-2 space-y-2 group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
          <div className="flex items-center gap-2">
            <BsGraphUpArrow size={24} />
            <h2 className="text-2xl font-bold">Experinces</h2>
          </div>
        </div>
        <div className="space-y-6">
          {experinces
            .slice()
            .sort((a, b) => {
              // Extract the last 4-digit year from each string
              const getYear = (val: string) => {
                const match = val.match(/\d{4}/g);
                return match ? parseInt(match[match.length - 1], 10) : 0;
              };

              return getYear(b.year) - getYear(a.year); // DESC
            })
            .map((exp, idx) => (
              <div key={idx} className="dark:bg-gray-800 p-4 rounded border-1">
                <h3 className="text-sm font-semibold">{exp.title}</h3>
                <p
                  className="text-sm text-yellow-500 truncate w-full"
                  title={exp.company}
                >
                  {exp.company}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm dark:text-gray-300">{exp.year}</p>

                  <button
                    onClick={() => setSelectedExp(exp)}
                    className="px-3 py-1 dark:bg-gray-700 dark:text-white text-xs dark:border-amber-50 border-2 rounded shadow hover:scale-105 transition-transform hover:bg-gray-300 dark:hover:bg-gray-500"
                  >
                    Description
                  </button>
                </div>
              </div>
            ))}
        </div>
      </motion.section>

      {/* Modal */}
      {selectedExp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className=" bg-white border-1 dark:bg-gray-900 p-6 rounded-xl max-w-md w-full grainy"
          >
            <h3 className="text-lg font-bold">{selectedExp.title}</h3>
            <p className="text-yellow-500">{selectedExp.company}</p>
            <p className="dark:text-gray-300">{selectedExp.year}</p>
            <ul className="list-disc list-inside dark:text-gray-200 mt-4 space-y-2">
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedExp.techstack.map((tech, i) => (
                  <div
                    key={i}
                    className="py-1 px-2 rounded-md bg-accent-200 border text-text-100"
                  >
                    <p className="capitalize text-sm">{tech}</p>
                  </div>
                ))}
              </div>

              {(Array.isArray(selectedExp.description)
                ? selectedExp.description
                : [selectedExp.description]
              ).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedExp(null)}
              className="mt-6 px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 text-sm dark:text-white dark:border-amber-50 border-2 rounded shadow hover:scale-105 transition-transform hover:bg-gray-300 "
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Experience;
