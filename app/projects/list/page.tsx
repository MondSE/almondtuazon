import * as motion from "motion/react-client";
import Link from "next/link";
import React from "react";
import project from "@/data/project.json";
import { IoIosArrowRoundBack } from "react-icons/io";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 1.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
  transition: { duration: 1.8 },
};

const projectList = () => {
  return (
    <motion.section
      className="page-transition mx-auto px-4 py-8"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <div className=" flex items-center gap-4 mb-8">
        <motion.div variants={itemVariants}>
          <Link
            className=" inline-flex items-center gap-2 text-s, text-foreground/70 hover:text-foreground transition-colors"
            href={"/"}
          >
            <IoIosArrowRoundBack className=" text-4xl" />
            Back to Home
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h1 className=" text-2xl font-bold">All Project</h1>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        variants={containerVariants}
      >
        {project.map((proj, idx) => (
          <motion.div
            variants={itemVariants}
            key={idx}
            className=" bento-card p-4 space-y-2 group hover:bg-muted/50 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-800"
          >
            <div
              key={idx}
              className="block p-4 rounded hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold dark:text-white">
                {proj.name}
              </h3>
              <p
                className="text-sm dark:text-gray-300 mt-1 truncate w-full"
                title={proj.description} // shows full text on hover
              >
                {proj.description}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap mb-3">
                {proj.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded dark:text-gray-200 dark:border-amber-50 border-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/projects/view/${idx + 1}`}
                  className="dark:bg-black dark:text-white text-xs px-4 py-1 dark:border-amber-50 border-2 rounded-full shadow hover:scale-105 transition-transform "
                >
                  <span>Docs</span>
                </Link>
                {/* <Link
                  href={"#"}
                  className="bg-black dark:text-white text-xs px-4 py-1 dark:border-amber-50 border-2 rounded-full shadow hover:scale-105 transition-transform "
                >
                  <span>Image</span>
                </Link> */}
                <Link
                  href={proj.githubLink}
                  className="dark:bg-black dark:text-white text-xs px-4 py-1 dark:border-amber-50 border-2 rounded-full shadow hover:scale-105 transition-transform "
                  target="_blank"
                >
                  <span>GitHub</span>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default projectList;
