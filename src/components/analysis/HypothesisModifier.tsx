'use client';

import { useState } from 'react';
import { AnalysisResult, Hypothesis } from '@/types/analysis';

interface HypothesisModifierProps {
  analysis: AnalysisResult;
  onUpdate: (updatedAnalysis: AnalysisResult) => void;
}

export function HypothesisModifier({ analysis, onUpdate }: HypothesisModifierProps) {
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>(analysis.marketAnalysis.assumptions);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleHypothesisChange = (index: number, newValue: number) => {
    const updated = [...hypotheses];
    updated[index] = { ...updated[index], value: newValue };
    setHypotheses(updated);
  };

  const recalculateAnalysis = async () => {
    setIsRecalculating(true);
    
    try {
      // Simulate API call for recalculation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate new market analysis based on updated hypotheses
      const avgRevenue = hypotheses.find(h => h.key === 'avgRevenue')?.value || 20;
      const marketShare = hypotheses.find(h => h.key === 'marketShare')?.value || 1;
      const margin = hypotheses.find(h => h.key === 'margin')?.value || 60;
      const growthRate = hypotheses.find(h => h.key === 'growthRate')?.value || 20;
      
      // Recalculate market sizes
      const newTam = 50000000000; // Keep TAM constant as it's market-wide
      const newSam = newTam * (marketShare / 100) * 10; // SAM adjusted by market share assumption
      const newSom = newSam * 0.01; // SOM as 1% of SAM
      
      // Recalculate valuation based on new SOM
      const annualRevenue = newSom * (avgRevenue / 100);
      const revenueMultiple = 8.5;
      const newMinValuation = annualRevenue * (revenueMultiple - 2);
      const newMaxValuation = annualRevenue * (revenueMultiple + 2);
      
      const updatedAnalysis: AnalysisResult = {
        ...analysis,
        marketAnalysis: {
          ...analysis.marketAnalysis,
          tam: newTam,
          sam: newSam,
          som: newSom,
          assumptions: hypotheses,
          marketTrends: {
            cagr: growthRate,
            forecast10Years: newTam * Math.pow(1 + growthRate / 100, 10)
          }
        },
        valuationEstimate: {
          ...analysis.valuationEstimate,
          range: [newMinValuation, newMaxValuation] as [number, number],
          multiples: {
            ...analysis.valuationEstimate.multiples,
            growth: growthRate / 10
          }
        }
      };
      
      onUpdate(updatedAnalysis);
    } catch (error) {
      console.error('Error recalculating analysis:', error);
    } finally {
      setIsRecalculating(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Modify Assumptions</h2>
            <p className="text-gray-600">Adjust hypotheses and see updated calculations</p>
          </div>
        </div>
        <button
          onClick={recalculateAnalysis}
          disabled={isRecalculating}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          {isRecalculating ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Recalculating...</span>
            </div>
          ) : (
            'Recalculate Analysis'
          )}
        </button>
      </div>

      {/* Current Impact Summary */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Current Impact Summary</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Market Size (SOM)</p>
            <p className="text-xl font-bold text-blue-600">{formatCurrency(analysis.marketAnalysis.som)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Valuation Range</p>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(analysis.valuationEstimate.range[0])} - {formatCurrency(analysis.valuationEstimate.range[1])}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
            <p className="text-xl font-bold text-blue-600">{analysis.marketAnalysis.marketTrends.cagr}%</p>
          </div>
        </div>
      </div>

      {/* Hypothesis Sliders */}
      <div className="grid md:grid-cols-2 gap-6">
        {hypotheses.map((hypothesis, index) => (
          <div key={hypothesis.key} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{hypothesis.label}</h4>
                <p className="text-sm text-gray-600">{hypothesis.description}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-indigo-600">
                  {hypothesis.value}{hypothesis.unit}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <input
                type="range"
                min={hypothesis.min}
                max={hypothesis.max}
                step={hypothesis.unit === '%' ? 0.1 : 1}
                value={hypothesis.value}
                onChange={(e) => handleHypothesisChange(index, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${((hypothesis.value - hypothesis.min) / (hypothesis.max - hypothesis.min)) * 100}%, #e5e7eb ${((hypothesis.value - hypothesis.min) / (hypothesis.max - hypothesis.min)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{hypothesis.min}{hypothesis.unit}</span>
                <span>{hypothesis.max}{hypothesis.unit}</span>
              </div>
            </div>

            <div className="text-xs text-gray-600">
              Current: <span className="font-medium text-gray-900">{hypothesis.value}{hypothesis.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sensitivity Analysis */}
      <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-yellow-900">Sensitivity Analysis Tips</h3>
        </div>
        <div className="text-yellow-800 text-sm space-y-2">
          <p>• <strong>Market Share:</strong> Even small increases (1% → 2%) can double your addressable market</p>
          <p>• <strong>Revenue per User:</strong> Higher ARPU dramatically impacts valuation multiples</p>
          <p>• <strong>Growth Rate:</strong> Sustainable growth rates above 25% receive premium valuations</p>
          <p>• <strong>Margins:</strong> SaaS businesses with 70%+ margins are valued significantly higher</p>
        </div>
      </div>

      {/* Recalculation Status */}
      {isRecalculating && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-indigo-50 rounded-xl border border-indigo-200">
            <div className="w-5 h-5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mr-3"></div>
            <span className="text-indigo-800 font-medium">
              Recalculating market analysis and valuation estimates...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}