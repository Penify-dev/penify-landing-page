import Link from 'next/link';
import { CurrencyOptions } from '@/hooks/useCurrencyConversion';
import { CheckIcon } from '@heroicons/react/24/solid';

interface PricingCardProps {
  title: string;
  price: string | null;
  popular?: boolean;
  features: string[];
  currency: CurrencyOptions;
  planId: string;
  getCurrency: (priceInUSD: number) => number;
}

const titleColorMap: Record<string, string> = {
  'Freemium': 'from-cyan-400 to-cyan-600',
  'Premium': 'from-yellow-400 to-yellow-600',
  'Pro': 'from-pink-400 to-pink-600',
  'Enterprise': 'from-blue-400 to-blue-600',
};

// Map for currency formatting
const currencyFormatters: Record<CurrencyOptions, { symbol: string, position: 'prefix' | 'suffix', format: (price: number) => string }> = {
  'USD': {
    symbol: '$',
    position: 'prefix',
    format: (price) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price)
    }
  },
  'INR': {
    symbol: '₹',
    position: 'prefix',
    format: (price) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price)
    }
  }
};

export function PricingCard({
  title,
  price,
  popular = false,
  features,
  currency,
  planId,
  getCurrency,
}: PricingCardProps) {
  const formatter = currencyFormatters[currency] || currencyFormatters.USD;
  const priceNumber = price ? parseInt(price) : null;
  const displayPrice = priceNumber !== null ? getCurrency(priceNumber) : null;
  const formattedPrice = displayPrice !== null ? formatter.format(displayPrice) : null;
  const gradientClass = titleColorMap[title] || 'from-gray-400 to-gray-600';
  
  // Clean title (remove "/Private" or "/Public" if present)
  const displayTitle = title.split('/')[0];
  
  return (
    <div className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow ${
      popular ? 'border-blue-500 shadow-blue-500/30' : 'border-slate-700'
    } bg-slate-800 xl:p-8`} data-aos="fade-up" data-aos-duration="800" data-aos-delay={popular ? "200" : "0"}>
      {popular && (
        <div className="w-full mx-auto -mt-8 mb-3">
          <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <h3 className={`mb-4 text-2xl font-semibold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
        {displayTitle}
      </h3>
      
      {displayPrice !== null ? (
        <div className="flex flex-col items-center my-4">
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold text-white">
              {formattedPrice}
            </span>
          </div>
          <span className="text-sm text-slate-400 mt-1">/month</span>
        </div>
      ) : (
        <div className="flex justify-center items-baseline my-8">
          <span className="text-2xl font-medium text-white">Contact Us</span>
        </div>
      )}
      
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" />
            <span className="text-slate-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        href={displayPrice !== null
          ? `https://dashboard.penify.dev/profile/payments?currency=${currency || "USD"}&plan=${planId}`
          : "https://calendly.com/sumansaurabh-snorkell/intro-snorkell-i"}
        target="_blank"
        rel="noopener noreferrer"
        className={`${popular 
          ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
          : 'bg-slate-700 hover:bg-slate-600 focus:ring-slate-500'} 
          mt-auto rounded-lg px-5 py-3 text-center text-sm font-medium text-white transition-all duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-opacity-50`}
      >
        {displayPrice === 0 ? "Start for free" : (displayPrice !== null ? "Choose plan" : "Contact sales")}
      </Link>
    </div>
  );
}
