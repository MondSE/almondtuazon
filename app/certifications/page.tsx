import * as motion from "motion/react-client";
import Link from "next/link";
import React from "react";
import certification from "@/data/certification.json";

const certifications = () => {
  return (
    <motion.section
      className="page-transition max-w-4xl mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className=" flex items-center gap-4 mb-8">
        <Link
          className=" inline-flex items-center gap-2 text-s, text-foreground/70 hover:text-foreground transition-colors"
          href={"/"}
        >
          Back to Home
        </Link>
        <h1 className=" text-2xl font-bold">All Certifications</h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
        {certification.map((cert, idx) => (
          <Link
            className=" bento-card p-4 space-y-2 group hover:bg-muted/50"
            href={"#"}
            key={idx}
          >
            <h3 className=" text-lg font-semibold group-hover:text-accent transition-colors">
              {/* Certification title */}
              {cert.title}
            </h3>
            <p className=" text-sm text-foreground/70">
              {/* company name */}
              {cert.issuer}
            </p>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};

export default certifications;
