"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import React, { useState } from "react";
import project from "@/data/project.json";
import { IoIosArrowRoundBack } from "react-icons/io";
import ProjectCard from "@/app/components/ui/ProjectCard";
import { AnimatePresence } from "motion/react";

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

const ProjectList = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (images: string[]) => {
    setCurrentImages(images);
    setCurrentIndex(0);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);

  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length
    );

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
            <IoIosArrowRoundBack className=" text-4xl" />
            Back to Home
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <h1 className=" text-2xl font-bold">All Project</h1>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
        variants={containerVariants}
      >
        {project.map((proj, idx) => (
          <ProjectCard
            key={idx}
            proj={proj}
            index={idx}
            onImageClick={openModal}
          />
        ))}

        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
            <div className="relative max-w-lg w-full p-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImages[currentIndex]}
                  src={currentImages[currentIndex]}
                  alt="preview"
                  className="w-full h-auto object-contain mx-auto rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl select-none
                bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl select-none
                bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
              >
                ›
              </button>

              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-3xl select-none
                bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ProjectList;
