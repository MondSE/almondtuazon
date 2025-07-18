import * as motion from "motion/react-client";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-2 space-y-3 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Connect
      </h2>
      <div className="flex gap-6">
        <a
          href="--"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaGithub size={28} />
        </a>
        <a
          href="--"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaLinkedin size={28} />
        </a>
        <a
          href="--"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaTwitter size={28} />
        </a>
      </div>
    </motion.section>
  );
};

export default SocialLinks;
