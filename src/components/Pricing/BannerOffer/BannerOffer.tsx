import { CurrencyOptions } from "@/hooks/useCurrencyConversion";
import Link from "next/link";
import { addReferrerToUrl } from "@/utils/gtag";

interface BannerOfferProps {
  price: number;
  currency: CurrencyOptions;
  getCurrency: (price: number) => number;
}

/**
 * Renders a banner offer with a display price and currency symbol.
 *
 * @param {Object} props - The component's props.
 * @param {number} props.price - The price of the offer.
 * @param {string} props.currency - The currency code for the price.
 * @param {Function} props.getCurrency - A function that takes the price and returns a formatted currency string.
 * @returns {JSX.Element} - A React element representing the banner offer.
 *
 * @example
 * const formatPrice = (price) => `$${price.toFixed(2)}`;
 * <BannerOffer price={19.99} currency="USD" getCurrency={formatPrice} />
 */
export function BannerOffer({ price, currency, getCurrency }: BannerOfferProps) {
  const displayPrice = getCurrency(price);
  const currencySymbol = currency === "INR" ? "₹" : "$";
  
  return (
    <div className="w-full p-8 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Document Full Repo
          </h2>
          <p className="text-blue-100 text-lg">
            Get your entire repository documented in minute
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-white">{currencySymbol}{displayPrice}</span>
            <span className="ml-2 text-xl text-blue-200">/-</span>
          </div>
          <Link
            href={addReferrerToUrl("https://github.com/apps/penify-dev/installations/select_target")}
            className="px-4 py-4 bg-white text-blue-900 rounded-lg text-lg font-medium hover:bg-blue-100 transition-colors shadow-lg"
            style={{ textAlign: "center" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Start Documenting
          </Link>
        </div>
      </div>
    </div>
  );
}
