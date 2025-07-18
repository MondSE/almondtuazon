import React from "react";
import * as motion from "motion/react-client";
import projects from "@/data/project.json";

const Projects = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-6 space-y-2 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <a
            href={proj.link}
            key={idx}
            className="block bg-gray-800 p-4 rounded hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-white">{proj.name}</h3>
            <p className="text-sm text-gray-300 mt-1">{proj.description}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {proj.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
