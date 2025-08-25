"use client";

import React, { useState } from "react";
import * as motion from "motion/react-client";
import experinces from "@/data/experince.json";

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
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
          Experience
        </h2>
        <div className="space-y-6">
          {experinces.map((exp, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded">
              <h3 className="text-sm font-semibold">{exp.title}</h3>
              <p className="text-sm text-yellow-400">{exp.company}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-300">{exp.year}</p>

                <button
                  onClick={() => setSelectedExp(exp)}
                  className="px-3 py-1 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-100 border-1 rounded text-sm"
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
            className="bg-gray-900 p-6 rounded-xl max-w-md w-full"
          >
            <h3 className="text-lg font-bold">{selectedExp.title}</h3>
            <p className="text-yellow-400">{selectedExp.company}</p>
            <p className="text-gray-300">{selectedExp.year}</p>
            <ul className="list-disc list-inside text-gray-200 mt-4 space-y-2">
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
              className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
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
