// components/About.tsx
import * as motion from "motion/react-client";
import aboutData from "@/data/about.json";
import { BsPencilSquare } from "react-icons/bs";

export const About = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <BsPencilSquare size={24} />
          <h2 className="text-2xl font-bold">About me</h2>
        </div>
      </div>
      {aboutData.map((about, abid) => (
        <p
          key={abid}
          className="dark:text-gray-300 text-sm leading-relaxed space-y-4"
        >
          {about.aboutData}
        </p>
      ))}
    </motion.section>
  );
};
