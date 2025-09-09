export type TechnologyUsed = {
  frontEnd: string;
  backEnd: string;
  dataBase: string;
};

export type Implementation = {
  frontEnd: string[];
  backEnd: string[];
  dataBase: string[];
};

export type Project = {
  id: number;
  name: string;
  description: string;
  tech: string[];
  link: string;
  githubLink: string;
  projectSummary: string;
  sampleImageProject: string[];
  aim: string[];
  technologiesUsed: TechnologyUsed[];
  dataBaseDiagram: string;
  implementation: Implementation[];
};
