// components/About.tsx
import * as motion from "motion/react-client";

export const About = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-800 pb-2">
        About
      </h2>
      <p className="text-gray-300 text-sm leading-relaxed space-y-4">
        --
        <br />
        <br />
        --
        <br />
        <br />
        --
      </p>
    </motion.section>
  );
};
