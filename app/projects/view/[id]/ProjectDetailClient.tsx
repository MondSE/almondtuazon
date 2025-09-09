"use client";

import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Project } from "@/types/project";
import Image from "next/image";

type Props = {
  project: Project;
};

const basePath = process.env.NODE_ENV === "production" ? "/almondtuazon" : "";

const withBasePath = (src: string) => {
  if (!src) return "";
  if (src.startsWith("http")) return src; // external links untouched
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

              {/* Gallery Nav */}
              {isFromGallery &&
                Array.isArray(project.sampleImageProject) &&
                project.sampleImageProject.length > 1 && (
                  <>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
                      <button
                        className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentIndex > 0) {
                            const newIndex = currentIndex - 1;
                            setCurrentIndex(newIndex);
                            setSelectedImage(
                              project.sampleImageProject![newIndex]
                            );
                          }
                        }}
                        disabled={currentIndex === 0}
                      >
                        &lt;
                      </button>
                    </div>

                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
                      <button
                        className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            currentIndex <
                            project.sampleImageProject!.length - 1
                          ) {
                            const newIndex = currentIndex + 1;
                            setCurrentIndex(newIndex);
                            setSelectedImage(
                              project.sampleImageProject![newIndex]
                            );
                          }
                        }}
                        disabled={
                          currentIndex ===
                          project.sampleImageProject!.length - 1
                        }
                      >
                        &gt;
                      </button>
                    </div>
                  </>
                )}
            </div>
          </div>
        )}

        {/* Aim */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-3">Aim</h2>
        <p className="mb-5">
          The main goal of {project.name} is to provide users with an all-in-one
          tool to:
        </p>
        {Array.isArray(project.aim) && project.aim.length > 0 && (
          <ul className="list-disc list-inside space-y-1">
            {project.aim.map((aim: string, index: number) => (
              <li key={index} className="mb-5">
                {aim}
              </li>
            ))}
          </ul>
        )}

        {/* Technologies Used */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          Technologies Used
        </h2>
        <ul>
          <li className="mb-5">
            <h3 className="inline font-semibold">Frontend: </h3>
            <span>
              {project.technologiesUsed?.[0]?.frontEnd || "Not specified"}
            </span>
          </li>
          <li className="mb-5">
            <h3 className="inline font-semibold">Backend: </h3>
            <span>
              {project.technologiesUsed?.[0]?.backEnd || "Not specified"}
            </span>
          </li>
          <li className="mb-5">
            <h3 className="inline font-semibold">Database: </h3>
            <span>
              {project.technologiesUsed?.[0]?.dataBase || "Not specified"}
            </span>
          </li>
        </ul>

        {/* Database Diagram */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-5">Database Design</h2>
        {project.dataBaseDiagram &&
          typeof project.dataBaseDiagram === "string" && (
            <div
              className="relative overflow-hidden rounded-xl cursor-pointer group mb-5"
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

        {/* Implementation */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-3">Implementation</h2>
        <div className="mb-5">
          <h3 className="font-semibold">Frontend:</h3>
          <ul className="list-disc list-inside ml-4">
            {project.implementation?.[0]?.frontEnd?.map(
              (item: string, index: number) => <li key={index}>{item}</li>
            ) || <li>Not specified</li>}
          </ul>
        </div>
        <div className="mb-5">
          <h3 className="font-semibold">Backend:</h3>
          <ul className="list-disc list-inside ml-4">
            {project.implementation?.[0]?.backEnd?.map(
              (item: string, index: number) => <li key={index}>{item}</li>
            ) || <li>Not specified</li>}
          </ul>
        </div>
        <div className="mb-5">
          <h3 className="font-semibold">Database:</h3>
          <ul className="list-disc list-inside ml-4">
            {project.implementation?.[0]?.dataBase?.map(
              (item: string, index: number) => <li key={index}>{item}</li>
            ) || <li>Not specified</li>}
          </ul>
        </div>

        {/* Links */}
        <h2 className="mb-5">Links</h2>
        <ul>
          <li>
            <a
              href={project.githubLink}
              target="_blank"
              className="text-pretty text-primary-100 underline"
            >
              GitHub Repository
            </a>
          </li>
        </ul>
      </article>
    </motion.section>
  );
}
