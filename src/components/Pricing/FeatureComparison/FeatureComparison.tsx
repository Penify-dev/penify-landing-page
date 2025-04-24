import { useState, useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import PRICING from '@/utils/pricing.json';
import { PlansTable } from '../PlansTable/PlansTable';

interface FeatureComparisonProps {
  initiallyOpen?: boolean;
}

export function FeatureComparison({ initiallyOpen = false }: FeatureComparisonProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full mt-12">
      {isMobile ? (
        <a
          href="https://docs.penify.dev/docs/penify-pricing.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center text-blue-400 underline py-4 bg-slate-900 rounded-lg border border-slate-700"
        >
          View full comparison in docs
        </a>
      ) : (
        <>
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
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}>
            <PlansTable/>
          </div>
        </>
      )}
    </div>
  );
}
