"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import data from "@/data/project.json";

export default function ProjectDetail() {
  const params = useParams(); // Get route parameters
  const { id } = params; // Extract 'id'
  const project = data.find((p) => p.id === Number(id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFromGallery, setIsFromGallery] = useState<boolean>(false); // NEW

  // Lock scroll when modal opens and unlock when it closes
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll when modal closes
    }
    return () => {
      document.body.style.overflow = "auto"; // Ensure scroll is re-enabled
    };
  }, [selectedImage]);

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

  if (!project) return <h1>Project not found</h1>;

  // Outside the JSX
  const handleImageClick = (src: string) => {
    // your modal opening logic here
    // e.g., setModalImage(src), setShowModal(true)
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedImage(project.sampleImageProject![newIndex]);
      } else if (
        e.key === "ArrowRight" &&
        currentIndex < project.sampleImageProject!.length - 1
      ) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedImage(project.sampleImageProject![newIndex]);
      } else if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex, project.sampleImageProject]);

  return (
    <>
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
        </div>
        <h1 className=" text-3xl lg:text-5xl mb-5 font-bold">
          {project.description}
        </h1>
        <div className=" flex gap-2 mt-5">
          <div className="mb-10">
            <h3 className="text-pretty text-text-100/60 mb-5">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
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
        <div className=" flex flex-wrap gap-2 mb-10">
          <p className="">GitHub: </p>
          <div className=" flex gap-1">
            <a
              href={project.githubLink}
              target="_blank"
              className=" text-pretty text-primary-100 underline"
            >
              {project.githubLink}
            </a>
          </div>
          <p></p>
        </div>
        <article className=" max-w-[65ch] mb-20 ">
          {/* Project Summary */}
          <h2
            id="resumen-del-proyecto"
            className="text-2xl lg:text-3xl font-bold mb-3"
          >
            Project Summary
          </h2>
          <p className="mb-5">{project.projectSummary}</p>
          {/* Project Sample Image */}
          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
            {Array.isArray(project.sampleImageProject) &&
              project.sampleImageProject.map((src: string, index: number) => (
                <div
                  key={index}
                  className="relative w-full aspect-square overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => {
                    setSelectedImage(src);
                    setCurrentIndex(index);
                    setIsFromGallery(true); // mark as gallery
                  }}
                >
                  <img
                    src={src}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
          </div>

          {/* Popup Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex items-center justify-center"
              onClick={() => setSelectedImage(null)} // Close modal on backdrop click
            >
              <div
                className="relative max-w-3xl w-full p-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              >
                {/* Selected Image */}
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />

                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200 text-xl"
                  onClick={() => {
                    setSelectedImage(null);
                    setIsFromGallery(false);
                  }}
                >
                  ×
                </button>
                {/* Navigation Buttons - Show only if it's an image gallery (array) */}
                {isFromGallery &&
                  Array.isArray(project.sampleImageProject) &&
                  project.sampleImageProject.length > 1 && (
                    <>
                      {/* Previous Button */}
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

                      {/* Next Button */}
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

          {/* Objective */}
          <h2 id="Objective" className=" text-2xl lg:text-3xl font-bold mb-3">
            Aim
          </h2>
          <p className=" mb-5">
            The main goal of {project.name} is to provide users with an
            all-in-on tool to:
          </p>
          {Array.isArray(project.aim) && project.aim.length > 0 && (
            <ul className="list-disc list-inside space-y-1">
              {project.aim.map((aim, index) => (
                <li key={index} className=" mb-5">
                  {aim}
                </li>
              ))}
            </ul>
          )}
          {/* Objective */}
          <h2 id="Objective" className=" text-2xl lg:text-3xl font-bold mb-4">
            Technologies Used
          </h2>
          <ul>
            <li className=" mb-5">
              <h3 className="inline font-semibold">Frontend: </h3>
              <span>
                {project.technologiesUsed?.[0]?.frontEnd || "Not specified"}{" "}
              </span>
            </li>
            <li className=" mb-5">
              <h3 className="inline font-semibold">Backend: </h3>
              <span>
                {project.technologiesUsed?.[0]?.backEnd || "Not specified"}
              </span>
            </li>
            <li className=" mb-5">
              <h3 className="inline font-semibold">Database: </h3>
              <span>
                {project.technologiesUsed?.[0]?.dataBase || "Not specified"}
              </span>
            </li>
          </ul>
          <h2
            id="resumen-del-proyecto"
            className="text-2xl lg:text-3xl font-bold mb-5"
          >
            Database Design
          </h2>
          {/* data diagram image */}

          {/* Project Sample Image */}
          {/* Image Grid */}
          <div className="mt-5 mb-5">
            {project.dataBaseDiagram &&
              typeof project.dataBaseDiagram === "string" && (
                <div
                  className="relative w-full aspect-square overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => {
                    setSelectedImage(project.dataBaseDiagram);
                    setIsFromGallery(false); // mark as single
                  }}
                  // Show the single image in modal
                >
                  <img
                    src={project.dataBaseDiagram}
                    alt="Database Diagram"
                    className="w-full h-full object-fit transition-transform group-hover:scale-105"
                  />
                </div>
              )}
          </div>
          <h2
            id="resumen-del-proyecto"
            className=" text-2xl lg:text-3xl font-bold mb-3"
          >
            implementation
          </h2>
          <div className="mb-5">
            <h3 className="font-semibold">Frontend:</h3>
            <ul className="list-disc list-inside ml-4">
              {project.implementation?.[0]?.frontEnd?.map((item, index) => (
                <li key={index}>{item}</li>
              )) || <li>Not specified</li>}
            </ul>
          </div>
          <div className="mb-5">
            <h3 className="font-semibold">Backend:</h3>
            <ul className="list-disc list-inside ml-4">
              {project.implementation?.[0]?.backEnd?.map((item, index) => (
                <li key={index}>{item}</li>
              )) || <li>Not specified</li>}
            </ul>
          </div>
          <div className="mb-5">
            <h3 className="font-semibold">Database:</h3>
            <ul className="list-disc list-inside ml-4">
              {project.implementation?.[0]?.dataBase?.map((item, index) => (
                <li key={index}>{item}</li>
              )) || <li>Not specified</li>}
            </ul>
            <h2 className=" mb-5">Links</h2>
            <ul>
              <li>
                <a
                  href={project.githubLink}
                  target="_blank"
                  className=" text-pretty text-primary-100 underline"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </article>
      </motion.section>
    </>
  );
}
