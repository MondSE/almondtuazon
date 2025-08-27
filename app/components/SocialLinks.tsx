import * as motion from "motion/react-client";
import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitch,
} from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";

const SocialLinks = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-6 space-y-3 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center mb-6 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <MdConnectWithoutContact size={24} />
          <h2 className="text-2xl font-bold">Connect</h2>
        </div>
      </div>
      <div className="flex gap-6 justify-center">
        <a
          href="https://github.com/MondSE"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaGithub size={28} />
        </a>
        <a
          href="https://www.linkedin.com/in/almond-rae-tuazon-647a2726a"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaLinkedin size={28} />
        </a>
        <a
          href="https://www.instagram.com/monskiyyy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaInstagram size={28} />
        </a>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaFacebook size={28} />
        </a>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaDiscord size={28} />
        </a>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaTwitch size={28} />
        </a>
        <a
          href="https://www.tiktok.com/@mooncrazyyyy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 transition"
        >
          <FaTiktok size={28} />
        </a>
      </div>
    </motion.section>
  );
};

export default SocialLinks;
