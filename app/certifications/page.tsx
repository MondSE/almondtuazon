import * as motion from "motion/react-client";
import Link from "next/link";
import React from "react";
import certification from "@/data/certification.json";

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

const certifications = () => {
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
            Back to Home
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h1 className=" text-2xl font-bold">All Certifications</h1>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        variants={containerVariants}
      >
        {certification.map((cert, idx) => (
          <motion.div
            variants={itemVariants}
            key={idx}
            className=" bento-card p-4 space-y-2 group hover:bg-muted/50"
          >
            <Link href={"#"} key={idx}>
              <h3 className=" text-lg font-semibold group-hover:text-accent transition-colors">
                {/* Certification title */}
                {cert.title}
              </h3>
              <p className=" text-sm text-foreground/70">
                {/* company name */}
                {cert.issuer}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default certifications;
