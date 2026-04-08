"use client";

import React, { useMemo } from "react";
import * as motion from "motion/react-client";
import experinces from "@/data/experince.json";
import { BsGraphUpArrow } from "react-icons/bs";

const Experience = () => {
  /* SORT EXPERIENCE (LATEST FIRST) */
  const sortedExperiences = useMemo(() => {
    const getYear = (val: string) => {
      const match = val.match(/\d{4}/g);
      return match ? parseInt(match[match.length - 1], 10) : 0;
    };

    return [...experinces].sort((a, b) => getYear(b.year) - getYear(a.year));
  }, []);

  return (
    <motion.section
      className="relative p-6 rounded-2xl border shadow-xl space-y-6 col-span-1 md:col-span-2 md:row-span-2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent/20">
            <BsGraphUpArrow size={22} />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Experience
          </h2>
        </div>
      </div>

      <div className="relative ml-4">
        {/* Vertical line */}
        <div className="absolute -left-1.5 w-0.5 bg-black h-full dark:bg-amber-50 rounded"></div>

        {sortedExperiences.map((exp, idx) => (
          <motion.div
            key={exp.title} // better than index
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative mb-8 flex items-start group"
          >
            {/* Dot */}
            <div className="absolute -left-3.5 z-10 flex justify-center items-center">
              {idx === 0 ? (
                <motion.div
                  className="w-4 h-4 bg-red-500 dark:bg-red-500 rounded-full border-2 border-white dark:border-black relative"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <div className="w-4 h-4 bg-black rounded-full border-2 border-white dark:bg-amber-50 dark:border-black"></div>
              )}
            </div>

            {/* Card */}
            <div className="ml-4 p-4 rounded-r-lg border bg-card/60 backdrop-blur-md shadow-lg w-full transition hover:shadow-xl hover:scale-105">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm md:text-base font-semibold">
                    {exp.title}
                  </h3>
                  <p className="text-red-500 text-sm">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {exp.year}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;
