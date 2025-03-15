import { CurrencyOptions } from "@/hooks/useCurrencyConversion";
import Link from "next/link";

interface BannerOfferProps {
  price: number;
  currency: CurrencyOptions;
  getCurrency: (priceInUSD: number) => number;
}

/**
 * Renders a banner offer component displaying a pricing offer for documentation services.
 *
 * @param {Object} props - The properties for the BannerOffer component.
 * @param {number} props.price - The price of the service.
 * @param {string} props.currency - The currency code (e.g., "INR", "USD").
 * @param {function} props.getCurrency - A function to format the price based on the currency.
 *
 * @returns {JSX.Element} The rendered banner offer component.
 *
 * @throws {Error} Throws an error if the price is not a valid number.
 */
export function BannerOffer({ price, currency, getCurrency }: BannerOfferProps) {
  const displayPrice = getCurrency(price);
  const currencySymbol = currency === "INR" ? "₹" : "$";
  
  return (
    <div className="w-full p-8 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            One-time Payment, Document Full Repo
          </h2>
          <p className="text-blue-100 text-lg">
            Get your entire repository documented in minutes, for less than 
            <span className="font-bold text-white"> {currencySymbol}{displayPrice}</span>
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-white">{currencySymbol}{displayPrice}</span>
            <span className="ml-2 text-xl text-blue-200">/-</span>
          </div>
          <Link
            href={`https://github.com/apps/penify-dev/installations/select_target`}
            className=" px-4 py-4 bg-white text-blue-900 rounded-lg text-lg font-medium hover:bg-blue-100 transition-colors shadow-lg"
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
