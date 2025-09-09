import data from "@/data/project.json";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return data.map((project) => ({
    id: project.id.toString(),
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Await params first
  const { id } = await params;

  const project = data.find((p) => p.id === Number(id));

  if (!project) {
    return <h1>Project not found</h1>;
  }

  return <ProjectDetailClient project={project} />;
}
