"use client";

import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Project } from "@/types/project"; // we'll create this type

type ProjectDetailClientProps = {
  project: Project;
};

export default function ProjectDetailClient({
  project,
}: ProjectDetailClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage || !project.sampleImageProject) return;

      if (e.key === "ArrowLeft" && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(project.sampleImageProject[newIndex]);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < project.sampleImageProject.length - 1
      ) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(project.sampleImageProject[newIndex]);
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex, project.sampleImageProject]);

  return (
    <motion.section
      className="page-transition mx-auto px-4 py-8"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.15, duration: 1.8 },
        },
      }}
    >
      <div className="flex items-center gap-4 mb-8">
        <Link
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
          href={"/"}
        >
          Back to Home
        </Link>
      </div>
      <h1 className="text-3xl lg:text-5xl mb-5 font-bold">
        {project.description}
      </h1>
      {/* ...rest of your JSX... */}
    </motion.section>
  );
}
