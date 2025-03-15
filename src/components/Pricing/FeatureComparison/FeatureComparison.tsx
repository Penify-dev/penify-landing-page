import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import PRICING from '@/utils/pricing.json';
import { PlansTable } from '../PlansTable/PlansTable';

interface FeatureComparisonProps {
  initiallyOpen?: boolean;
}

/**
 * A functional component that renders a feature comparison section.
 * It includes a button to toggle the visibility of the feature comparison table.
 *
 * @param {Object} props - The properties for the component.
 * @param {boolean} [props.initiallyOpen=false] - Determines if the comparison table is initially open.
 *
 * @returns {JSX.Element} The rendered feature comparison component.
 *
 * @throws {Error} Throws an error if the component fails to render properly.
 */
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
       <PlansTable/>
      </div>
    </div>
  );
}
