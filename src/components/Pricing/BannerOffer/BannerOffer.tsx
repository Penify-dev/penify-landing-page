import { CurrencyOptions } from "@/hooks/useCurrencyConversion";
import Link from "next/link";
import { Dropwdown } from "@/components/Dropdown/Dropdown";
import { vendors2 } from "@/utils/teamItems";

interface BannerOfferProps {
  price: number;
  currency: CurrencyOptions;
  getCurrency: (priceInUSD: number) => number;
}

export function BannerOffer({ price, currency, getCurrency }: BannerOfferProps) {
  const displayPrice = getCurrency(price);
  const currencySymbol = currency === "INR" ? "₹" : "$";
  
  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            Document your <Dropwdown title="Git" items={vendors2} type="hero" /> Repository today!
          </h2>
          <p className="text-blue-200">
            Complete documentation for your entire repository at an affordable price
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="text-3xl font-bold text-white">
            {currencySymbol}{displayPrice} <span className="text-lg opacity-75">one-time</span>
          </div>
          <Link
            href={`https://dashboard.penify.dev/profile/payments?currency=${currency || "USD"}&fullRepo=true`}
            className="px-8 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
