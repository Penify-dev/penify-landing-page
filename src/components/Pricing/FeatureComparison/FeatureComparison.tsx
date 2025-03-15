import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import PRICING from '@/utils/pricing.json';

interface FeatureComparisonProps {
  initiallyOpen?: boolean;
}

export function FeatureComparison({ initiallyOpen = false }: FeatureComparisonProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  
  return (
    <div className="w-full mt-12">
      <button
        type="button"
        className="flex w-full justify-between items-center px-4 py-3 bg-slate-800 rounded-lg border border-slate-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white">Compare all features</h3>
        <IconChevronDown
          className={`h-5 w-5 text-slate-400 transition duration-200 ease-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <div className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs uppercase bg-slate-800 text-slate-300">
              <tr>
                <th scope="col" className="px-6 py-3 bg-slate-800 sticky left-0 z-10">
                  Feature
                </th>
                {PRICING.plans.map(plan => (
                  <th key={plan.title} scope="col" className="px-6 py-3 text-center">
                    {plan.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICING.data.flatMap(category => 
                category.features.map((feature, featureIndex) => (
                  <tr key={`${category.category}-${featureIndex}`} className="border-b border-slate-700">
                    <th scope="row" className="px-6 py-4 font-medium text-white bg-slate-800 sticky left-0 z-10">
                      {feature.title}
                    </th>
                    {feature.contents.map((content, contentIndex) => (
                      <td key={contentIndex} className="px-6 py-4 text-center">
                        {content.title === "-" ? (
                          <span className="text-slate-500">—</span>
                        ) : (
                          <span className="text-slate-300">{content.title}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
