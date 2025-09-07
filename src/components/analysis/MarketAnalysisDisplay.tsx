'use client';

import { MarketAnalysis } from '@/types/analysis';

interface MarketAnalysisDisplayProps {
  marketAnalysis: MarketAnalysis;
}

export function MarketAnalysisDisplay({ marketAnalysis }: MarketAnalysisDisplayProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`;
    }
    if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`;
    }
    if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(1)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  const getMarketSize = (tam: number, sam: number, som: number) => {
    const total = tam;
    const samPercent = (sam / total) * 100;
    const somPercent = (som / total) * 100;
    
    return { samPercent, somPercent };
  };

  const { samPercent, somPercent } = getMarketSize(
    marketAnalysis.tam, 
    marketAnalysis.sam, 
    marketAnalysis.som
  );

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market Analysis</h2>
            <p className="text-gray-600">TAM, SAM, and SOM calculations</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Market Growth (CAGR)</p>
          <p className="text-2xl font-bold text-green-600">{marketAnalysis.marketTrends.cagr}%</p>
        </div>
      </div>

      {/* Market Size Overview */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* TAM */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 text-sm">Total Addressable Market</h3>
              <p className="text-xs text-blue-700">Global market opportunity</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-900 mb-2">{formatCurrency(marketAnalysis.tam)}</p>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-full"></div>
          </div>
          <p className="text-xs text-blue-700 mt-2">100% of total market</p>
        </div>

        {/* SAM */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 text-sm">Serviceable Addressable Market</h3>
              <p className="text-xs text-purple-700">Realistic target market</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-900 mb-2">{formatCurrency(marketAnalysis.sam)}</p>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${samPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-purple-700 mt-2">{samPercent.toFixed(1)}% of TAM</p>
        </div>

        {/* SOM */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-900 text-sm">Serviceable Obtainable Market</h3>
              <p className="text-xs text-green-700">Achievable market share</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-900 mb-2">{formatCurrency(marketAnalysis.som)}</p>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${somPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-green-700 mt-2">{somPercent.toFixed(1)}% of TAM</p>
        </div>
      </div>

      {/* Market Trends */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Market Trends & Projections
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-orange-900">Growth Rate (CAGR)</h4>
              <span className="text-2xl font-bold text-orange-600">{marketAnalysis.marketTrends.cagr}%</span>
            </div>
            <p className="text-orange-700 text-sm">
              The market is experiencing strong growth, indicating healthy demand and expansion opportunities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-teal-900">10-Year Forecast</h4>
              <span className="text-xl font-bold text-teal-600">{formatCurrency(marketAnalysis.marketTrends.forecast10Years)}</span>
            </div>
            <p className="text-teal-700 text-sm">
              Projected market size in 10 years based on current growth trends and industry analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Methodology
        </h3>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-gray-700 leading-relaxed">{marketAnalysis.methodology}</p>
        </div>
      </div>

      {/* Current Assumptions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Key Assumptions Used
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {marketAnalysis.assumptions.map((assumption, index) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">{assumption.label}</h4>
                <span className="font-bold text-blue-600">
                  {assumption.value}{assumption.unit}
                </span>
              </div>
              <p className="text-blue-700 text-sm">{assumption.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}