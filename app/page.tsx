import Image from "next/image";
import Header from "./components/Header";
import { About } from "./components/About";
import TechStack from "./components/TechStack";
import Experience from "./components/Experience";
import * as motion from "motion/react-client";
import Certifications from "./components/Certifications";
import Recommendation from "./components/Recommendation";
import SocialLinks from "./components/SocialLinks";
import Projects from "./components/Projects";
import BlogPosts from "./components/BlogPosts";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <section className=" grid grid-cols-1 md:grid-cols-6 gap-2">
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Certifications />
        {/* <Recommendation /> */}
        <SocialLinks />
        <BlogPosts />
      </section>
    </motion.div>
  );
}
