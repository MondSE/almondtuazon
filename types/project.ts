export interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  link: string;
  githubLink: string;
  projectSummary: string;
  sampleImageProject: string[];
  aim: string[];
  technologiesUsed: {
    frontEnd: string;
    backEnd: string;
    dataBase: string;
  }[];
  dataBaseDiagram: string;
  implementation: {
    frontEnd: string[];
    backEnd: string[];
    dataBase: string[];
  }[];
}
