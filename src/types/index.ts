export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'SQL & Database' | 'Python ETL' | 'Data Modeling';
  description: string;
  keyHighlights: string[];
  technologies: string[];
  githubUrl?: string;
  sqlSnippet?: string;
  schemaDetails?: {
    tableName: string;
    columns: { name: string; type: string; description: string }[];
  };
  metrics?: { label: string; value: string }[];
}

export interface SQLQuery {
  id: string;
  title: string;
  filename: string;
  description: string;
  sql: string;
  executionTime: string;
  rowsCount: number;
  columns: string[];
  sampleData: Record<string, string | number>[];
  notes?: string;
}

export interface PipelineStep {
  id: string;
  stepNumber: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  codePreview?: string;
  keyOutputs: string[];
}

export interface RoadmapMilestone {
  number: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  period: string;
  summary: string;
  keyLearnings: string[];
  toolsUsed: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    status: 'Core Skill' | 'Actively Using' | 'Currently Learning' | 'Next on Roadmap';
    highlight: string;
  }[];
}
