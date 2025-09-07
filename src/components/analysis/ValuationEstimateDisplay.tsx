'use client';

import { ValuationEstimate } from '@/types/analysis';

interface ValuationEstimateDisplayProps {
  valuation: ValuationEstimate;
}

export function ValuationEstimateDisplay({ valuation }: ValuationEstimateDisplayProps) {
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

  const [minValue, maxValue] = valuation.range;
  const averageValue = (minValue + maxValue) / 2;

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'from-green-500 to-emerald-500';
    if (confidence >= 0.6) return 'from-blue-500 to-indigo-500';
    if (confidence >= 0.4) return 'from-yellow-500 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High Confidence';
    if (confidence >= 0.6) return 'Medium Confidence';
    if (confidence >= 0.4) return 'Low Confidence';
    return 'Very Low Confidence';
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Valuation Estimate</h2>
            <p className="text-gray-600">Potential company valuation range</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm text-gray-500">Confidence:</span>
            <div className="flex items-center space-x-1">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getConfidenceColor(valuation.confidence)} rounded-full transition-all duration-300`}
                  style={{ width: `${valuation.confidence * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(valuation.confidence * 100)}%
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500">{getConfidenceLabel(valuation.confidence)}</p>
        </div>
      </div>

      {/* Valuation Range */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimated Valuation Range</h3>
            <div className="flex items-center justify-center space-x-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Minimum</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(minValue)}</p>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Average</p>
                <p className="text-3xl font-bold text-yellow-600">{formatCurrency(averageValue)}</p>
              </div>
              <div className="w-12 h-0.5 bg-gray-300"></div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Maximum</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(maxValue)}</p>
              </div>
            </div>
          </div>

          {/* Visual Range Indicator */}
          <div className="relative">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-full"></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-4 flex items-center">
              <div className="w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-md"></div>
              <div className="flex-1"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-md"></div>
              <div className="flex-1"></div>
              <div className="w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-md"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Valuation Multiples */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Valuation Multiples Applied
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-green-600">{valuation.multiples.revenue}x</span>
            </div>
            <h4 className="font-semibold text-green-900 mb-2">Revenue Multiple</h4>
            <p className="text-green-700 text-sm">
              Industry standard revenue multiple for similar companies in this sector.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-blue-600">{valuation.multiples.users}x</span>
            </div>
            <h4 className="font-semibold text-blue-900 mb-2">User Multiple</h4>
            <p className="text-blue-700 text-sm">
              Valuation multiple based on user base size and engagement metrics.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-purple-600">{valuation.multiples.growth}x</span>
            </div>
            <h4 className="font-semibold text-purple-900 mb-2">Growth Multiple</h4>
            <p className="text-purple-700 text-sm">
              Premium applied for expected growth rate and market expansion potential.
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
          Valuation Methodology
        </h3>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-gray-700 leading-relaxed mb-4">{valuation.methodology}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Primary Methods Used</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Comparable company analysis</li>
                <li>• Revenue multiple valuation</li>
                <li>• Market-based approach</li>
                <li>• Growth-adjusted pricing</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Key Considerations</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Market conditions and trends</li>
                <li>• Competitive positioning</li>
                <li>• Technology differentiation</li>
                <li>• Scalability potential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="font-semibold text-red-900">Important Disclaimers</h3>
        </div>
        <div className="text-red-800 text-sm space-y-2">
          <p>• This is an estimated valuation based on limited publicly available data and industry comparables.</p>
          <p>• Actual valuation may vary significantly based on financial performance, market conditions, and investor sentiment.</p>
          <p>• These estimates should not be used as the sole basis for investment or business decisions.</p>
          <p>• Consider engaging professional valuation experts for more detailed analysis.</p>
        </div>
      </div>
    </div>
  );
}