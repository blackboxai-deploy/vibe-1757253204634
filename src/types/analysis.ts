// Core analysis types for the GitHub repository analyzer

export interface SimilarProject {
  name: string;
  url: string;
  similarity: number;
  description?: string;
}

export interface TechnicalAnalysis {
  stack: string[];
  complexity: number;
  fileCount: number;
  projectType: string;
  similarProjects: SimilarProject[];
  confidence: number;
}

export interface ProductFunction {
  title: string;
  tags: string[];
  useCase: string;
  confidence: number;
  description?: string;
}

export interface SimilarCompany {
  name: string;
  sector: string;
  pitch: string;
  revenue: string;
  users: string;
  funding: string;
  employees: number;
  growth: string;
  source: 'crunchbase' | 'estimated';
}

export interface Hypothesis {
  key: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  description: string;
}

export interface MarketAnalysis {
  tam: number;
  sam: number;
  som: number;
  methodology: string;
  assumptions: Hypothesis[];
  marketTrends: {
    cagr: number;
    forecast10Years: number;
  };
}

export interface ValuationEstimate {
  range: [number, number];
  methodology: string;
  confidence: number;
  multiples: {
    revenue: number;
    users: number;
    growth: number;
  };
}

export interface AnalysisResult {
  id: string;
  repositoryUrl: string;
  timestamp: string;
  technicalAnalysis: TechnicalAnalysis;
  productFunction: ProductFunction;
  similarCompanies: SimilarCompany[];
  marketAnalysis: MarketAnalysis;
  valuationEstimate: ValuationEstimate;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  currentStep: number;
}

export interface GitHubRepository {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  size: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    login: string;
    type: string;
  };
  files?: {
    name: string;
    path: string;
    type: 'file' | 'dir';
    content?: string;
  }[];
}

// Default hypotheses for market analysis
export const DEFAULT_HYPOTHESES: Hypothesis[] = [
  {
    key: 'avgRevenue',
    label: 'Average Revenue per User',
    value: 20,
    unit: '€/month',
    min: 5,
    max: 500,
    description: 'Average monthly revenue per SaaS user'
  },
  {
    key: 'marketShare',
    label: 'Target Market Share',
    value: 1,
    unit: '%',
    min: 0.1,
    max: 10,
    description: 'Realistic market share for MVP launch'
  },
  {
    key: 'margin',
    label: 'Gross Margin',
    value: 60,
    unit: '%',
    min: 20,
    max: 90,
    description: 'Expected gross profit margin'
  },
  {
    key: 'growthRate',
    label: 'Market Growth Rate',
    value: 20,
    unit: '%/year',
    min: 5,
    max: 50,
    description: 'Annual market growth rate'
  }
];