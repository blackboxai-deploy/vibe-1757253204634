'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AnalysisResult } from '@/types/analysis';
import { AnalysisSteps } from '@/components/AnalysisSteps';
import { TechnicalAnalysisDisplay } from '@/components/analysis/TechnicalAnalysisDisplay';
import { ProductFunctionDisplay } from '@/components/analysis/ProductFunctionDisplay';
import { SimilarCompaniesDisplay } from '@/components/analysis/SimilarCompaniesDisplay';
import { MarketAnalysisDisplay } from '@/components/analysis/MarketAnalysisDisplay';
import { ValuationEstimateDisplay } from '@/components/analysis/ValuationEstimateDisplay';
import { HypothesisModifier } from '@/components/analysis/HypothesisModifier';

export default function AnalysisPage() {
  const params = useParams();
  const analysisId = params.id as string;
  
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!analysisId) return;

    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/analyze-repo?id=${analysisId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch analysis');
        }
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();

    // Poll for updates if analysis is in progress
    const pollInterval = setInterval(() => {
      if (analysis && (analysis.status === 'in-progress' || analysis.status === 'pending')) {
        fetchAnalysis();
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [analysisId, analysis?.status]);

  const handleHypothesisUpdate = (updatedAnalysis: AnalysisResult) => {
    setAnalysis(updatedAnalysis);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Analysis</h2>
          <p className="text-gray-600">Please wait while we fetch your repository analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The requested analysis could not be found.'}</p>
          <a href="/" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Start New Analysis
          </a>
        </div>
      </div>
    );
  }

  const getRepoName = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    return match ? `${match[1]}/${match[2]}` : url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Repository Analysis</h1>
              <p className="text-lg text-gray-600">
                <span className="font-medium">{getRepoName(analysis.repositoryUrl)}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                analysis.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : analysis.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : analysis.status === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {analysis.status === 'completed' && 'Completed'}
                {analysis.status === 'in-progress' && 'In Progress'}
                {analysis.status === 'pending' && 'Starting...'}
                {analysis.status === 'error' && 'Error'}
              </div>
              <a 
                href={analysis.repositoryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                View on GitHub
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Progress Steps */}
          <AnalysisSteps currentStep={analysis.currentStep} status={analysis.status} />
        </div>

        {/* Analysis Results */}
        <div className="space-y-8">
          {/* Technical Analysis */}
          {analysis.currentStep >= 1 && (
            <TechnicalAnalysisDisplay analysis={analysis.technicalAnalysis} />
          )}

          {/* Product Function */}
          {analysis.currentStep >= 2 && (
            <ProductFunctionDisplay productFunction={analysis.productFunction} />
          )}

          {/* Similar Companies */}
          {analysis.currentStep >= 3 && (
            <SimilarCompaniesDisplay companies={analysis.similarCompanies} />
          )}

          {/* Market Analysis */}
          {analysis.currentStep >= 4 && (
            <MarketAnalysisDisplay marketAnalysis={analysis.marketAnalysis} />
          )}

          {/* Valuation Estimate */}
          {analysis.currentStep >= 5 && (
            <ValuationEstimateDisplay valuation={analysis.valuationEstimate} />
          )}

          {/* Hypothesis Modifier */}
          {analysis.status === 'completed' && (
            <HypothesisModifier 
              analysis={analysis} 
              onUpdate={handleHypothesisUpdate}
            />
          )}
        </div>

        {/* Loading State for In-Progress Analysis */}
        {analysis.status === 'in-progress' && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mr-3"></div>
              <span className="text-blue-800 font-medium">
                Analysis in progress... Step {analysis.currentStep} of 6
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}