import { NextRequest, NextResponse } from 'next/server';
import { AnalysisResult, DEFAULT_HYPOTHESES } from '@/types/analysis';

// In-memory storage for demo purposes (use database in production)
const analysisStore = new Map<string, AnalysisResult>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { repositoryUrl } = body;
    
    if (!repositoryUrl || typeof repositoryUrl !== 'string') {
      return NextResponse.json(
        { error: 'Repository URL is required' },
        { status: 400 }
      );
    }
    
    // Validate GitHub URL
    const githubPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
    if (!githubPattern.test(repositoryUrl)) {
      return NextResponse.json(
        { error: 'Invalid GitHub repository URL' },
        { status: 400 }
      );
    }
    
    // Generate unique ID for this analysis
    const analysisId = generateAnalysisId();
    
    // Initialize analysis result
    const analysisResult: AnalysisResult = {
      id: analysisId,
      repositoryUrl,
      timestamp: new Date().toISOString(),
      status: 'pending',
      currentStep: 0,
      technicalAnalysis: {
        stack: [],
        complexity: 0,
        fileCount: 0,
        projectType: '',
        similarProjects: [],
        confidence: 0
      },
      productFunction: {
        title: '',
        tags: [],
        useCase: '',
        confidence: 0
      },
      similarCompanies: [],
      marketAnalysis: {
        tam: 0,
        sam: 0,
        som: 0,
        methodology: '',
        assumptions: DEFAULT_HYPOTHESES,
        marketTrends: {
          cagr: 0,
          forecast10Years: 0
        }
      },
      valuationEstimate: {
        range: [0, 0],
        methodology: '',
        confidence: 0,
        multiples: {
          revenue: 0,
          users: 0,
          growth: 0
        }
      }
    };
    
    // Store the analysis
    analysisStore.set(analysisId, analysisResult);
    
    // Start the analysis process asynchronously
    startAnalysisProcess(analysisId, repositoryUrl);
    
    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('Error starting analysis:', error);
    
    return NextResponse.json(
      { error: 'Failed to start analysis' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const analysisId = searchParams.get('id');
  
  if (!analysisId) {
    return NextResponse.json(
      { error: 'Analysis ID is required' },
      { status: 400 }
    );
  }
  
  const analysis = analysisStore.get(analysisId);
  
  if (!analysis) {
    return NextResponse.json(
      { error: 'Analysis not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(analysis);
}

function generateAnalysisId(): string {
  return 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

async function startAnalysisProcess(analysisId: string, repositoryUrl: string) {
  try {
    const analysis = analysisStore.get(analysisId);
    if (!analysis) return;
    
    console.log(`Starting analysis process for ${repositoryUrl}`);
    
    // Update status to in-progress
    analysis.status = 'in-progress';
    analysis.currentStep = 1;
    analysisStore.set(analysisId, analysis);
    
    // Step 1: Technical Analysis
    const technicalAnalysis = await performTechnicalAnalysis(repositoryUrl);
    analysis.technicalAnalysis = technicalAnalysis;
    analysis.currentStep = 2;
    analysisStore.set(analysisId, analysis);
    
    // Step 2: Product Function Analysis
    const productFunction = await performProductAnalysis(repositoryUrl, technicalAnalysis);
    analysis.productFunction = productFunction;
    analysis.currentStep = 3;
    analysisStore.set(analysisId, analysis);
    
    // Step 3: Similar Companies Analysis
    const similarCompanies = await performCompanyAnalysis(productFunction);
    analysis.similarCompanies = similarCompanies;
    analysis.currentStep = 4;
    analysisStore.set(analysisId, analysis);
    
    // Step 4: Market Analysis
    const marketAnalysis = await performMarketAnalysis(productFunction, similarCompanies);
    analysis.marketAnalysis = marketAnalysis;
    analysis.currentStep = 5;
    analysisStore.set(analysisId, analysis);
    
    // Step 5: Valuation Analysis
    const valuationEstimate = await performValuationAnalysis(marketAnalysis, similarCompanies);
    analysis.valuationEstimate = valuationEstimate;
    analysis.currentStep = 6;
    analysisStore.set(analysisId, analysis);
    
    // Mark as completed
    analysis.status = 'completed';
    analysisStore.set(analysisId, analysis);
    
    console.log(`Analysis completed for ${repositoryUrl}`);
    
  } catch (error) {
    console.error('Error in analysis process:', error);
    const analysis = analysisStore.get(analysisId);
    if (analysis) {
      analysis.status = 'error';
      analysisStore.set(analysisId, analysis);
    }
  }
}

// Mock analysis functions (replace with actual AI implementation)
async function performTechnicalAnalysis(_repositoryUrl: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    stack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    complexity: 7,
    fileCount: 156,
    projectType: 'Web Application',
    similarProjects: [
      {
        name: 'Next.js',
        url: 'https://github.com/vercel/next.js',
        similarity: 0.85,
        description: 'React framework for production'
      },
      {
        name: 'Create React App',
        url: 'https://github.com/facebook/create-react-app',
        similarity: 0.72,
        description: 'Set up modern web app by running one command'
      }
    ],
    confidence: 0.88
  };
}

async function performProductAnalysis(_repositoryUrl: string, _technicalAnalysis: any) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    title: 'Repository Analysis Platform',
    tags: ['SaaS', 'Developer Tools', 'Analytics'],
    useCase: 'Developers analyze GitHub repositories to understand market potential and technical complexity',
    confidence: 0.82,
    description: 'AI-powered platform for comprehensive GitHub repository analysis'
  };
}

async function performCompanyAnalysis(_productFunction: any) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return [
    {
      name: 'GitHub',
      sector: 'Developer Tools',
      pitch: 'Platform for version control and collaboration',
      revenue: '$1B+',
      users: '100M+',
      funding: 'Acquired by Microsoft for $7.5B',
      employees: 3000,
      growth: '20%',
      source: 'crunchbase' as const
    },
    {
      name: 'GitLab',
      sector: 'DevOps Platform',
      pitch: 'Complete DevOps platform',
      revenue: '$400M',
      users: '30M+',
      funding: 'IPO - $11B market cap',
      employees: 1500,
      growth: '35%',
      source: 'crunchbase' as const
    }
  ];
}

async function performMarketAnalysis(_productFunction: any, _similarCompanies: any[]) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    tam: 50000000000, // 50B
    sam: 5000000000,  // 5B  
    som: 50000000,    // 50M
    methodology: 'Bottom-up analysis based on developer tools market',
    assumptions: DEFAULT_HYPOTHESES,
    marketTrends: {
      cagr: 22,
      forecast10Years: 125000000000 // 125B
    }
  };
}

async function performValuationAnalysis(_marketAnalysis: any, _similarCompanies: any[]) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    range: [500000, 2000000] as [number, number], // 500K - 2M
    methodology: 'Revenue multiples based on similar SaaS companies',
    confidence: 0.75,
    multiples: {
      revenue: 8.5,
      users: 25,
      growth: 15
    }
  };
}