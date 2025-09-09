"use client";

import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Project } from "@/types/project";
import Image from "next/image";

type Props = {
  project: Project;
};

// ✅ Use env variable instead of getConfig
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Helper for image paths
const withBasePath = (src: string) => {
  if (!src) return "";
  if (src.startsWith("http")) return src; // leave full URLs untouched
  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
};

export default function ProjectDetailClient({ project }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFromGallery, setIsFromGallery] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";
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
        setSelectedImage(withBasePath(project.sampleImageProject[newIndex]));
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < project.sampleImageProject.length - 1
      ) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(withBasePath(project.sampleImageProject[newIndex]));
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex, project.sampleImageProject]);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 1.8 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
    transition: { duration: 1.8 },
  };

  return (
    <motion.section
      className="page-transition mx-auto px-4 py-8"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <motion.div variants={itemVariants}>
          <Link
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
            href={"/"}
          >
            Back to Home
          </Link>
        </motion.div>
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-5xl mb-5 font-bold">
        {project.description}
      </h1>

      {/* Tech Stack */}
      <div className="flex gap-2 mt-5 mb-10">
        <div>
          <h3 className="text-pretty text-text-100/60 mb-5">Technologies:</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string, index: number) => (
              <div
                key={index}
                className="py-1 px-2 rounded-md bg-accent-200 flex justify-center gap-2 items-center border text-text-100"
              >
                <p className="capitalize text-sm"># {tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub Link */}
      <div className="flex flex-wrap gap-2 mb-10">
        <p>GitHub:</p>
        <div className="flex gap-1">
          <a
            href={project.githubLink}
            target="_blank"
            className="text-pretty text-primary-100 underline wrap-anywhere"
          >
            {project.githubLink}
          </a>
        </div>
      </div>

      {/* Summary */}
      <article className="max-w-[65ch] mb-20">
        <h2 className="text-2xl lg:text-3xl font-bold mb-3">Project Summary</h2>
        <p className="mb-5">{project.projectSummary}</p>

        {/* Image Gallery */}
        <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
          {Array.isArray(project.sampleImageProject) &&
            project.sampleImageProject.map((src: string, index: number) => (
              <div
                key={index}
                className="relative w-full aspect-square overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => {
                  setSelectedImage(withBasePath(src));
                  setCurrentIndex(index);
                  setIsFromGallery(true);
                }}
              >
                <Image
                  src={withBasePath(src)}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
        </div>

        {/* Popup Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-3xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Selected"
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <button
                className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200 text-xl"
                onClick={() => {
                  setSelectedImage(null);
                  setIsFromGallery(false);
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Database Diagram */}
        {project.dataBaseDiagram &&
          typeof project.dataBaseDiagram === "string" && (
            <div
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => {
                setSelectedImage(withBasePath(project.dataBaseDiagram));
                setIsFromGallery(false);
              }}
            >
              <Image
                src={withBasePath(project.dataBaseDiagram)}
                alt="Database Diagram"
                width={1200}
                height={800}
                className="object-fit transition-transform group-hover:scale-105"
              />
            </div>
          )}
      </article>
    </motion.section>
  );
}
