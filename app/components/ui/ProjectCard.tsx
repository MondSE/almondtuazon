import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  githubLink: string;
  sampleImageProject?: string[];
}

interface ProjectCardProps {
  proj: Project;
  index: number;
  onImageClick?: (images: string[]) => void;
}

const isGithubPages =
  typeof window !== "undefined" &&
  window.location.hostname.includes("github.io");

export const basePath = isGithubPages ? "/almondtuazon" : "";

const withBasePath = (src: string) => {
  if (!src) return "";
  if (src.startsWith("http")) return src; // external links untouched
  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
};

export default function ProjectCard({
  proj,
  index,
  onImageClick,
}: ProjectCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  return (
    <div className="border dark:bg-gray-800 p-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-lg transition flex flex-col sm:flex-row sm:items-start gap-4">
      {proj.sampleImageProject && proj.sampleImageProject.length > 0 && (
        <Image
          src={withBasePath(proj.sampleImageProject[0])}
          alt={proj.name}
          onClick={() => onImageClick?.(proj.sampleImageProject!)}
          width={3500} // give width & height (required for optimization)
          height={3000}
          priority
          className="w-[8rem] h-[6rem] object-fit border-1 rounded-2xl cursor-pointer hover:opacity-75 transition mx-auto sm:mx-0 flex-shrink-0 shadow-2xl"
        />
      )}

      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className="text-lg font-semibold dark:text-white">{proj.name}</h3>

        <p
          className="text-sm dark:text-gray-300 mt-1 truncate w-full"
          title={proj.description}
        >
          {proj.description}
        </p>

        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2 mb-3">
          {(showAllTech ? proj.tech : proj.tech.slice(0, 3)).map((tech, i) => (
            <span
              key={i}
              className="text-xs dark:bg-gray-700 px-2 py-1 rounded dark:text-gray-200 border"
            >
              {tech}
            </span>
          ))}

          {proj.tech.length > 3 && (
            <button
              onClick={() => setShowAllTech(!showAllTech)}
              className="text-xs px-2 py-1 border rounded dark:text-gray-300 hover:bg-gray-600 transition"
            >
              {showAllTech ? "Show Less" : `+${proj.tech.length - 3} more`}
            </button>
          )}
        </div>

        <div className="flex justify-center sm:justify-start gap-4 mt-2">
          <Link
            href={`/projects/view/${index + 1}`}
            className="dark:bg-gray-700 dark:text-white text-xs px-4 py-1 border-2 rounded-full shadow hover:scale-105 transition-transform hover:bg-gray-500 hover:text-white"
          >
            Docs
          </Link>

          <Link
            href={proj.githubLink}
            className="dark:bg-gray-700 dark:text-white text-xs px-4 py-1 border-2 rounded-full shadow hover:scale-105 transition-transform hover:bg-gray-500 hover:text-white"
            target="_blank"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
