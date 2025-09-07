'use client';

import { AnalysisResult } from '@/types/analysis';

interface AnalysisStepsProps {
  currentStep: number;
  status: AnalysisResult['status'];
}

const steps = [
  {
    number: 1,
    title: 'Technical Analysis',
    description: 'Analyzing repository structure and technology stack'
  },
  {
    number: 2,
    title: 'Product Function',
    description: 'Identifying core product functionality and use cases'
  },
  {
    number: 3,
    title: 'Company Matching',
    description: 'Finding similar companies and competitive landscape'
  },
  {
    number: 4,
    title: 'Market Analysis',
    description: 'Calculating TAM, SAM, and SOM estimates'
  },
  {
    number: 5,
    title: 'Valuation Estimate',
    description: 'Estimating potential valuation ranges'
  },
  {
    number: 6,
    title: 'Completed',
    description: 'Analysis complete - modify hypotheses if needed'
  }
];

export function AnalysisSteps({ currentStep, status }: AnalysisStepsProps) {
  const getStepStatus = (stepNumber: number) => {
    if (status === 'error') {
      return stepNumber < currentStep ? 'completed' : stepNumber === currentStep ? 'error' : 'pending';
    }
    
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return status === 'completed' ? 'completed' : 'active';
    return 'pending';
  };

  const getStepIcon = (stepNumber: number, stepStatus: string) => {
    switch (stepStatus) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'active':
        return (
          <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <span className="text-gray-400 font-medium text-sm">{stepNumber}</span>
        );
    }
  };

  const getStepClasses = (stepStatus: string) => {
    const baseClasses = "flex items-center p-4 rounded-xl transition-all duration-300";
    
    switch (stepStatus) {
      case 'completed':
        return `${baseClasses} bg-green-50 border-2 border-green-200`;
      case 'active':
        return `${baseClasses} bg-blue-50 border-2 border-blue-200 scale-105 shadow-lg`;
      case 'error':
        return `${baseClasses} bg-red-50 border-2 border-red-200`;
      default:
        return `${baseClasses} bg-gray-50 border-2 border-gray-200`;
    }
  };

  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Step {Math.max(1, currentStep)} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="space-y-3">
          {steps.map((step) => {
            const stepStatus = getStepStatus(step.number);
            return (
              <div key={step.number} className={getStepClasses(stepStatus)}>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {getStepIcon(step.number, stepStatus)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">{step.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const stepStatus = getStepStatus(step.number);
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="flex items-center">
                  <div className={`analysis-step ${stepStatus} ${getStepClasses(stepStatus)} min-w-0 flex-1`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border-2 border-white">
                        {getStepIcon(step.number, stepStatus)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{step.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  {!isLast && (
                    <div className="flex-shrink-0 w-8 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 mx-2"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}