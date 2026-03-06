"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import project from "@/data/project.json";
import { IoIosArrowRoundBack } from "react-icons/io";
import ProjectCard from "@/app/components/ui/ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const ProjectList = () => {
  const [activeTab, setActiveTab] = useState("ALL");
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
      (prev) => (prev - 1 + currentImages.length) % currentImages.length,
    );

  /* AUTO GENERATE CATEGORIES */
  const categories = useMemo(() => {
    const cats = new Set<string>();
    project.forEach((p) => {
      if (p.category) cats.add(p.category.toUpperCase());
    });
    return ["ALL", ...Array.from(cats)];
  }, []);

  /* FILTER PROJECTS */
  const filteredProjects = useMemo(() => {
    if (activeTab === "ALL") return project;
    return project.filter((p) => p.category?.toUpperCase() === activeTab);
  }, [activeTab]);

  /* CATEGORY COUNT */
  const getCount = (cat: string) => {
    if (cat === "ALL") return project.length;
    return project.filter((p) => p.category?.toUpperCase() === cat).length;
  };

  return (
    <motion.section
      className="mx-auto px-4 py-8"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground"
          href={"/"}
        >
          <IoIosArrowRoundBack className="text-4xl" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold">All Project</h1>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-3 mb-8 relative">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative px-4 py-2 rounded-full text-sm font-medium"
          >
            {activeTab === tab && (
              <motion.span
                layoutId="activeTab"
                className="absolute inset-0 bg-black rounded-full -z-10 dark:bg-white"
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}

            <span
              className={
                activeTab === tab
                  ? "text-white dark:text-black"
                  : "text-foreground"
              }
            >
              {tab} ({getCount(tab)})
            </span>
          </button>
        ))}
      </div>

      {/* PROJECT GRID */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            [...filteredProjects]
              .sort((a, b) => b.id - a.id)
              .map((proj) => (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <ProjectCard
                    key={proj.id}
                    proj={proj}
                     onImageClick={openModal}
                  />
                </motion.div>
              ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12 text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No projects found.
            </motion.div>
          )}
        </AnimatePresence>

        {/* IMAGE MODAL */}
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
                />
              </AnimatePresence>

              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl bg-white text-black p-2 rounded-full"
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl bg-white text-black p-2 rounded-full"
              >
                ›
              </button>

              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-3xl bg-white text-black p-2 rounded-full"
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
