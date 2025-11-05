import Link from "next/link";

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
  onImageClick?: (images: string[]) => void; // ✅ add this
}

export default function ProjectCard({
  proj,
  index,
  onImageClick,
}: ProjectCardProps) {
  return (
    <div className="flex items-start gap-4 border dark:bg-gray-800 p-4 rounded hover:bg-gray-300 dark:hover:bg-gray-700 hover:shadow-lg transition">
      {/* LEFT SIDE CIRCULAR IMAGE */}
      {proj.sampleImageProject && proj.sampleImageProject.length > 0 && (
        <img
          src={proj.sampleImageProject[0]}
          alt={proj.name}
          onClick={() => onImageClick?.(proj.sampleImageProject!)} // ✅ Trigger modal
          className="w-35 h-30 object-contain rounded-2xl flex-shrink-0"
        />
      )}

      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold dark:text-white">{proj.name}</h3>

        <p
          className="text-sm dark:text-gray-300 mt-1 truncate"
          title={proj.description}
        >
          {proj.description}
        </p>

        <div className="flex gap-2 mt-2 flex-wrap mb-3">
          {proj.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs dark:bg-gray-700 px-2 py-1 rounded dark:text-gray-200 border"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-2">
          <Link
            href={`/projects/view/${index + 1}`}
            className="dark:bg-gray-700 dark:text-white text-xs px-4 py-1 border-2 rounded-full shadow hover:scale-105 transition-transform hover:bg-gray-500 hover:text-white"
          >
            <span>Docs</span>
          </Link>

          <Link
            href={proj.githubLink}
            target="_blank"
            className="dark:bg-gray-700 dark:text-white text-xs px-4 py-1 border-2 rounded-full shadow hover:scale-105 transition-transform hover:bg-gray-500 hover:text-white"
          >
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
