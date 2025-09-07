'use client';

import { SimilarCompany } from '@/types/analysis';

interface SimilarCompaniesDisplayProps {
  companies: SimilarCompany[];
}

export function SimilarCompaniesDisplay({ companies }: SimilarCompaniesDisplayProps) {
  const formatNumber = (value: string | number) => {
    if (typeof value === 'string') return value;
    return value.toLocaleString();
  };

  const getGrowthColor = (growth: string) => {
    const numericGrowth = parseInt(growth.replace('%', ''));
    if (numericGrowth >= 30) return 'text-green-600 bg-green-100';
    if (numericGrowth >= 20) return 'text-blue-600 bg-blue-100';
    if (numericGrowth >= 10) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getSourceBadge = (source: 'crunchbase' | 'estimated') => {
    return source === 'crunchbase' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-orange-100 text-orange-800 border-orange-200';
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Similar Companies</h2>
            <p className="text-gray-600">Competitive landscape and market comparables</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-indigo-600">{companies.length}</p>
          <p className="text-sm text-gray-600">Companies found</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {companies.map((company, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Company Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full font-medium">
                  {company.sector}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full border ${getSourceBadge(company.source)}`}>
                {company.source === 'crunchbase' ? 'Verified' : 'Estimated'}
              </span>
            </div>

            {/* Company Description */}
            <p className="text-gray-700 mb-4 leading-relaxed">{company.pitch}</p>

            {/* Company Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded mr-2 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600">Revenue</span>
                </div>
                <p className="font-bold text-green-700">{formatNumber(company.revenue)}</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-blue-500 rounded mr-2 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600">Users</span>
                </div>
                <p className="font-bold text-blue-700">{formatNumber(company.users)}</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-purple-500 rounded mr-2 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600">Funding</span>
                </div>
                <p className="font-bold text-purple-700 text-sm leading-tight">{company.funding}</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 bg-orange-500 rounded mr-2 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600">Employees</span>
                </div>
                <p className="font-bold text-orange-700">{formatNumber(company.employees)}</p>
              </div>
            </div>

            {/* Growth Rate */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGrowthColor(company.growth)}`}>
                {company.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Market Insights */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="font-semibold text-indigo-900">Market Insights</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <p className="text-sm text-gray-600 mb-1">Average Revenue</p>
            <p className="text-xl font-bold text-indigo-800">
              {companies.length > 0 ? 
                companies.map(c => c.revenue).join(', ').includes('M') ? '~$400M' : '~$1B+' 
                : 'N/A'
              }
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <p className="text-sm text-gray-600 mb-1">Average Growth</p>
            <p className="text-xl font-bold text-indigo-800">
              {companies.length > 0 ? 
                Math.round(companies.reduce((acc, c) => acc + parseInt(c.growth.replace('%', '')), 0) / companies.length) + '%'
                : 'N/A'
              }
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-200">
            <p className="text-sm text-gray-600 mb-1">Market Maturity</p>
            <p className="text-xl font-bold text-indigo-800">
              {companies.some(c => c.funding.includes('IPO')) ? 'Mature' : 'Growing'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}