import Link from 'next/link';
import { CurrencyOptions } from '@/hooks/useCurrencyConversion';
import { CheckIcon } from '@heroicons/react/24/solid';

interface PricingCardProps {
  title: string;
  price: string | null;
  popular?: boolean;
  features: string[];
  currency: CurrencyOptions;
  planId: string | null;
  billingCycle: 'monthly' | 'yearly';
  getCurrency: (price: number) => number;
}

const titleColorMap: Record<string, string> = {
  'Freemium': 'from-secondary-400 to-secondary-600',
  'Premium': 'from-yellow-400 to-yellow-600',
  'Pro': 'from-accent-400 to-accent-600',
  'Enterprise': 'from-primary-400 to-primary-600',
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
  },
  // Add more currencies as needed
};

export function PricingCard({
  title,
  price,
  popular = false,
  features,
  currency,
  planId,
  getCurrency,
  billingCycle,
}: PricingCardProps) {
  const formatter = currencyFormatters[currency] || currencyFormatters.USD;
  const priceNumber = price ? parseInt(price) : null;
  const displayPrice = priceNumber !== null ? getCurrency(priceNumber) : null;
  const formattedPrice = displayPrice !== null ? formatter.format(displayPrice) : null;
  const gradientClass = titleColorMap[title.split('/')[0]] || 'from-gray-400 to-gray-600';
  
  // Clean title (remove "/Private" or "/Public" if present)
  const displayTitle = title.split('/')[0];
  
  return (
    <div className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-xl border shadow ${
      popular ? 'border-accent-500 shadow-accent-500/30' : 'border-primary-700'
    } bg-primary-900/30 backdrop-blur-sm xl:p-8`} data-aos="fade-up" data-aos-duration="800" data-aos-delay={popular ? "200" : "0"}>
      {popular && (
        <div className="p-1 mb-4 -mt-6 -mx-6 text-center text-white rounded-t-lg bg-gradient-to-r from-accent-500 to-accent-600">
          <p className="text-xs font-medium">Most Popular</p>
        </div>
      )}
      
      <h3 className={`mb-4 text-xl font-medium text-white bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>{displayTitle}</h3>
      
      {displayPrice !== null ? (
        <div className="flex justify-center items-baseline my-4">
          <span className="mr-2 text-4xl font-extrabold text-white">{formattedPrice}</span>
          <span className="text-gray-400">/  {billingCycle}</span>
        </div>
      ) : (
        <div className="my-4 h-12 flex items-center justify-center">
          <span className="text-lg font-medium text-white">Contact Us</span>
        </div>
      )}
      
      {/* Feature List */}
      <ul role="list" className="mb-8 space-y-3 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0">
              <CheckIcon className="h-5 w-5 text-secondary-400" />
            </div>
            <p className="ml-3 text-sm text-gray-300">{feature}</p>
          </li>
        ))}
      </ul>
      
      <Link
        href={planId ? `https://github.com/apps/penify-dev/installations/select_target?planId=${planId}` : 'https://calendly.com/sumansaurabh-snorkell/intro-snorkell-i'}
        className={`inline-flex justify-center items-center font-medium rounded-lg px-5 py-2.5 text-center text-sm transition-colors ${
          popular 
            ? 'bg-accent-600 hover:bg-accent-700 text-white' 
            : 'bg-primary-700/80 hover:bg-primary-700 text-white'
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {planId ? "Get Started" : "Contact Sales"}
      </Link>
    </div>
  );
}
