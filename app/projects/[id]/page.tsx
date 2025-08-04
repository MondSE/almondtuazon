"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

const data = [
  {
    id: 1,
    header: "ACTDO",
    title: "ACTDO Mangement Information System",
    techStack: ["html", "css", "js", "MySql", "Xampp"],
    githubLink: "https://github.com/MondSE/ACTDO-IMS-DEMO",
    projectSummary:
      "This project is used as a template for the demonstration of the information management system of ACTDO as a Projects using the PHP native and Sql on Xampp to be clear there are no ACTDO valuable data exposed to upload this template.",
    sampleImageProject: ["none"],
    aim: [
      "This software is to automate these processes and to improve the overall efficiency and clients experience of Office.",
      "The system is easy to use and has user-friendly functionalities to help the employee's for their daily transactions.",
    ],
    technologiesUsed: [
      {
        frontEnd:
          " HTML, CSS, JavaScript and Bootstrap for the user interface.",
        backEnd: " PHP with the Xampp to handle application logic and APIs.",
        dataBase:
          " MySQL to store user data, routines and queries to the virtual assistant.",
      },
    ],
    dataBaseDiagram: "image",
    implementation: [
      {
        frontEnd: [
          "Development of a clean and dynamic user dashboard for creating, editing, and viewing exercise routines.",
          "Integration of interactive graphics to display physical progress.",
        ],
        backEnd: ["Implementation of endpoints for CRUD routines."],
        dataBase: [
          "Designing tables for users, exercises, and queries with normalized relationships.",
        ],
      },
    ],
  },
  {
    id: 2,
    header: "ACtdo",
    title: "hello",
    techStack: ["html", "css", "js", "MySql"],
    githubLink: "/",
    projectSummary: "explain ko muna",
    sampleImageProject: ["none", "none", "none", "none"],
    aim: ["none", "none", "none"],
    technologiesUsed: [
      {
        frontEnd: "asasdasdccc",
        backEnd: "asdasdasdccc",
        dataBase: "asdasdasdcccc",
      },
    ],
    dataBaseDiagram: "image",
    implementation: [
      {
        frontEnd: [
          "Development of a clean and dynamic user dashboard for creating, editing, and viewing exercise routines.",
          "Integration of interactive graphics to display physical progress.",
        ],
        backEnd: ["Implementation of endpoints for CRUD routines."],
        dataBase: [
          "Designing tables for users, exercises, and queries with normalized relationships.",
        ],
      },
    ],
  },
];

export default function ProjectDetail() {
  const params = useParams(); // Get route parameters
  const { id } = params; // Extract 'id'

  const project = data.find((p) => p.id === Number(id));

  if (!project) return <h1>Project not found</h1>;

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
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

  // Show the selected image and set the index
  //   const openModal = (index) => {
  //     setSelectedImage(project.sampleImageProject[index]);
  //     setCurrentIndex(index);
  //   };

  // Navigate to the next image
  //   const nextImage = () => {
  //     if (currentIndex < project.sampleImageProject.length - 1) {
  //       setCurrentIndex(currentIndex + 1);
  //       setSelectedImage(project.sampleImageProject[currentIndex + 1]);
  //     }
  //   };

  // Navigate to the previous image
  //   const prevImage = () => {
  //     if (currentIndex > 0) {
  //       setCurrentIndex(currentIndex - 1);
  //       setSelectedImage(project.sampleImageProject[currentIndex - 1]);
  //     }
  //   };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
    transition: { duration: 1.8 },
  };

  return (
    <>
      <div className=" contianer px-4 pt-20 lg:pt-32 mx-auto max-w-screen-lg">
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
          {project.title}
        </h1>
        <div className=" flex gap-2 mt-5">
          <div className="mb-10">
            <h3 className="text-pretty text-text-100/60">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
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
        <article className=" max-w-[65ch] prose mb-20 lg:prose-lg dark:text-amber-50">
          {/* Project Summary */}
          <h2 id="resumen-del-proyecto">Project Summary</h2>
          <p className="mb-5">{project.projectSummary}</p>
          {/* Project Sample Image */}
          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-4 mt-5 mb-5">
            {project.sampleImageProject.map((src, index) => (
              <div
                key={index}
                className="relative w-full aspect-square overflow-hidden rounded-xl cursor-pointer group"
                // Open modal with selected image
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
              onClick={() => setSelectedImage(null)} // Close modal when clicking outside
            >
              <div
                className="relative max-w-3xl w-full p-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside image
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />

                {/* Close Button */}
                <button
                  className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-200 text-xl"
                  onClick={() => setSelectedImage(null)} // Close on button click
                >
                  ×
                </button>

                {/* Navigation Buttons */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
                  <button
                    className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
                    disabled={currentIndex === 0} // Disable when at the first image
                  >
                    &lt;
                  </button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
                  <button
                    className="bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200"
                    disabled={
                      currentIndex === project.sampleImageProject.length - 1
                    } // Disable when at the last image
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Objective */}
          <h2 id="Objective">Aim</h2>
          <p>
            The main goal of {project.title} is to provide users with an
            all-in-on tool to:
          </p>
          <ul>
            {project.aim.map((aims, index) => (
              <li key={index}>{aims}</li>
            ))}
          </ul>
          {/* Objective */}
          <h2 id="Objective">Technologies Used</h2>
          <ul>
            <li>
              <h3 className="inline font-semibold">Frontend: </h3>
              <span>
                {project.technologiesUsed?.[0]?.frontEnd || "Not specified"}{" "}
              </span>
            </li>
            <li>
              <h3 className="inline font-semibold">Backend: </h3>
              <span>
                {project.technologiesUsed?.[0]?.backEnd || "Not specified"}
              </span>
            </li>
            <li>
              <h3 className="inline font-semibold">Database: </h3>
              <span>
                {project.technologiesUsed?.[0]?.dataBase || "Not specified"}
              </span>
            </li>
          </ul>
          <h2 id="resumen-del-proyecto">Database Design</h2>
          {/* data diagram image */}
          <h2 id="resumen-del-proyecto">implementation</h2>
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
            <h2>Links</h2>
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
      </div>
    </>
  );
}
