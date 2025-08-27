import React from "react";
import * as motion from "motion/react-client";
import { BiCodeBlock } from "react-icons/bi";

const TechStack = () => {
  const frontend = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
  ];
  const backend = [
    "Node.js",
    "PHP",
    "TypeScript",
    "Laravel",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
  ];
  const devops = ["AWS S3", "Docker", "GitHub", "BitBucket", "SourceTree"];

  const renderStack = (title: string, stack: string[]) => (
    <div>
      <h4 className="text-sm font-semibold dark:text-white mb-2 uppercase tracking-wide">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <motion.span
            key={tech}
            className="dark:bg-gray-800 dark:text-white text-xs px-3 py-1 border-1 rounded-full shadow hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  );

  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <BiCodeBlock size={24} />
          <h2 className="text-2xl font-bold">Tech Stack</h2>
        </div>
      </div>
      <div className="space-y-6">
        {renderStack("Frontend", frontend)}
        {renderStack("Backend", backend)}
        {renderStack("DevOps & Cloud", devops)}
      </div>
    </motion.section>
  );
};

export default TechStack;
