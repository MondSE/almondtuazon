import React from "react";
import * as motion from "motion/react-client";
import projects from "@/data/project.json";
import Link from "next/link";
import { VscGithubProject } from "react-icons/vsc";
import { IoIosArrowRoundForward } from "react-icons/io";

const Projects = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <VscGithubProject size={24} />
          <h2 className="text-2xl font-bold">Projects</h2>
        </div>
        <Link href="/projects/list">
          <p className="flex items-center gap-1 text-sm hover:underline">
            <IoIosArrowRoundForward className="text-lg" />
            View More
          </p>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {projects.slice(0, 2).map((proj, idx) => (
          <div
            key={idx}
            className="block border-1 dark:bg-gray-800 p-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-lg transition"
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
                  className="text-xs dark:bg-gray-700 px-2 py-1 rounded dark:text-gray-200 border-1"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <Link
                href={`/projects/view/${idx + 1}`}
                className=" dark:bg-gray-700 dark:text-white text-xs px-4 py-1 dark:border-amber-50 border-2 rounded-full shadow hover:scale-105 transition-transform hover:bg-gray-500 hover:text-white"
              >
                <span>Docs</span>
              </Link>
              {/* <Link
                href={"#"}
                className="bg-gray-700 dark:text-white text-xs px-4 py-1 dark:border-amber-50 border-2 rounded-full shadow hover:scale-105 transition-transform "
              >
                <span>Image</span>
              </Link> */}
              <Link
                href={proj.githubLink}
                className="dark:bg-gray-700 dark:text-white text-xs px-4 py-1 dark:border-amber-50 border-2 rounded-full shadow hover:scale-105 transition-transform hover:bg-gray-500 hover:text-white"
                target="_blank"
              >
                <span>GitHub</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
