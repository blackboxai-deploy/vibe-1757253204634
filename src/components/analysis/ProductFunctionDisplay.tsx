'use client';

import { ProductFunction } from '@/types/analysis';

interface ProductFunctionDisplayProps {
  productFunction: ProductFunction;
}

export function ProductFunctionDisplay({ productFunction }: ProductFunctionDisplayProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'from-green-500 to-emerald-500';
    if (confidence >= 0.6) return 'from-blue-500 to-indigo-500';
    if (confidence >= 0.4) return 'from-yellow-500 to-orange-500';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Product Function</h2>
            <p className="text-gray-600">Core functionality and target market</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Confidence:</span>
          <div className="flex items-center space-x-1">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getConfidenceColor(productFunction.confidence)} rounded-full transition-all duration-300`}
                style={{ width: `${productFunction.confidence * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(productFunction.confidence * 100)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Main Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-purple-900">Product Title</h3>
            </div>
            <h4 className="text-xl font-bold text-purple-900 mb-2">{productFunction.title}</h4>
            {productFunction.description && (
              <p className="text-purple-700 leading-relaxed">{productFunction.description}</p>
            )}
          </div>

          {/* Tags */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-blue-900">Category Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {productFunction.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Use Case */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 h-full">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-green-900">Primary Use Case</h3>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-green-800 leading-relaxed text-lg italic">
                &quot;{productFunction.useCase}&quot;
              </p>
            </div>
            
            {/* User Journey Visualization */}
            <div className="mt-6 pt-6 border-t border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Typical User Journey</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                  <span className="text-green-800 text-sm">User discovers the repository</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                  <span className="text-green-800 text-sm">Evaluates technical implementation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  <span className="text-green-800 text-sm">Integrates or adapts for their needs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                  <span className="text-green-800 text-sm">Achieves their business/technical goal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Positioning */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900">Market Positioning Summary</h3>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            This product appears to be positioned in the <strong>{productFunction.tags[0]}</strong> market, 
            specifically targeting <strong>{productFunction.tags[1] || 'developers'}</strong> who need 
            <strong> {productFunction.tags[2] || 'technical solutions'}</strong>. 
            The primary value proposition centers around {productFunction.useCase.toLowerCase()}.
          </p>
        </div>
      </div>
    </div>
  );
}