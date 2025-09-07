'use client';

import { useState } from 'react';
import { GitHubInputForm } from '@/components/GitHubInputForm';
import { AnalysisResult } from '@/types/analysis';

export default function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisStart = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  if (analysisResult) {
    // Redirect to analysis page
    window.location.href = `/analysis/${analysisResult.id}`;
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Analyze Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GitHub Repository
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get comprehensive AI-powered analysis of any GitHub repository including technical assessment, 
              market sizing, competitive landscape, and potential valuation estimates.
            </p>

            {/* GitHub Input Form */}
            <div className="max-w-2xl mx-auto">
              <GitHubInputForm onAnalysisStart={handleAnalysisStart} />
            </div>

            {/* Features Preview */}
            <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Analysis</h3>
                <p className="text-gray-600">
                  Deep dive into your codebase with AI-powered analysis of tech stack, complexity, and similar projects.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Sizing</h3>
                <p className="text-gray-600">
                  Calculate TAM, SAM, and SOM using bottom-up methodology with real market data and trends.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Valuation Estimate</h3>
                <p className="text-gray-600">
                  Get potential valuation ranges based on comparable companies and industry multiples.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Pipeline Preview */}
      <div className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6-Stage AI Analysis Pipeline</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive analysis process breaks down your repository into actionable business insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: 1, title: 'Technical Analysis', desc: 'Stack, complexity, similar projects' },
              { step: 2, title: 'Product Function', desc: 'Use cases, target market, confidence' },
              { step: 3, title: 'Company Matching', desc: 'Similar businesses, funding, metrics' },
              { step: 4, title: 'Market Analysis', desc: 'TAM/SAM/SOM calculations' },
              { step: 5, title: 'Valuation Estimate', desc: 'Revenue multiples, range estimates' },
              { step: 6, title: 'Hypothesis Tuning', desc: 'Adjust assumptions, recalculate' }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {item.step < 6 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Analyze Your Repository?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of developers and entrepreneurs getting AI-powered insights into their projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium">
              Start Free Analysis
            </button>
            <a 
              href="https://techtalent-feature.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-medium"
            >
              Explore Talent Map
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}