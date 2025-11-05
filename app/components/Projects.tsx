"use client";
import React, { useState } from "react";
import * as motion from "motion/react-client";
import projects from "@/data/project.json";
import Link from "next/link";
import { VscGithubProject } from "react-icons/vsc";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProjectCard from "./ui/ProjectCard";
import { AnimatePresence } from "motion/react";

const Projects = () => {
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
      className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-2">
        <div className="flex items-center gap-2">
          <VscGithubProject size={24} />
          <h2 className="text-2xl font-bold">Projects</h2>
        </div>
        <Link href="/projects/list">
          <p className="flex items-center gap-1 text-sm hover:underline">
            <IoIosArrowRoundForward className="text-lg" />
            View More
          </p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {projects.slice(0, 2).map((proj, idx) => (
          <ProjectCard
            key={idx}
            proj={proj}
            index={idx}
            onImageClick={openModal}
          />
        ))}
      </div>

      {/* ✅ MODAL IMAGE SLIDESHOW */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50">
          <div className="relative max-w-lg w-full p-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImages[currentIndex]} // ✅ ensures fade triggers on change
                src={currentImages[currentIndex]}
                alt="preview"
                className="w-full h-auto object-contain mx-auto rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }} // ✅ smooth fade
                width={1200}
                height={800}
              />
            </AnimatePresence>

            {/* Controls */}
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
    </motion.section>
  );
};

export default Projects;
