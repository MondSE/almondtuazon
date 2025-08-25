import React from "react";
import * as motion from "motion/react-client";

const TechStack = () => {
  const frontend = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
  ];
  const backend = [
    "Node.js",
    "Python",
    "PHP",
    "Laravel",
    "PostgreSQL",
    "MongoDB",
  ];
  const devops = ["AWS", "Docker", "Kubernetes", "GitHub Actions"];

  const renderStack = (title: string, stack: string[]) => (
    <div>
      <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wide">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <motion.span
            key={tech}
            className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow hover:scale-105 transition-transform"
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
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Tech Stack
      </h2>
      <div className="space-y-6">
        {renderStack("Frontend", frontend)}
        {renderStack("Backend", backend)}
        {renderStack("DevOps & Cloud", devops)}
      </div>
    </motion.section>
  );
};

export default TechStack;
