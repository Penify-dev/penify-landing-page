import Image from "next/image";
import { useEffect, useState } from "react";
import { CurrencyOptions } from "../../../hooks/useCurrencyConversion";
import { useRouter } from "next/router";

interface CurrencyDropdownProps {
  currency: CurrencyOptions;
  handleCurrencyChange: (code: CurrencyOptions) => void;
}

interface CurrencyTypes {
  flag: string;
  code: CurrencyOptions;
  title: string;
  symbol: string;
}

const currencies: CurrencyTypes[] = [
  {
    flag: '/icons/country/US.svg',
    code: "USD",
    title: "US Dollar",
    symbol: "$",
  },
  {
    flag: "/icons/country/IN.svg",
    code: "INR",
    title: "Indian Rupee",
    symbol: "₹",
  },
];

export function CurrencyDropdown({
  currency,
  handleCurrencyChange,
}: CurrencyDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [shouldDropdownRender, setShouldDropdownRender] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isDropdownOpen) {
      setShouldDropdownRender(true);
    } else {
      const timeoutId = setTimeout(() => setShouldDropdownRender(false), 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isDropdownOpen]);

  // Find the current currency object
  const currentCurrency = currencies.find((c) => c.code === currency) || currencies[0];

  // Handler to update currency and close dropdown
  const handleCurrencySelect = (code: CurrencyOptions) => {
    handleCurrencyChange(code);
    setIsDropdownOpen(false);
    
    // Reload the page to apply currency changes
    setTimeout(() => {
      router.reload();
    }, 100);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors focus:outline-none"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
      >
        <span className="flex items-center gap-1">
          <span className="font-medium">{currentCurrency.symbol}</span>
          <span>{currentCurrency.code}</span>
        </span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id="currencyDropdown"
        className={`${
          isDropdownOpen
            ? "my-1 translate-y-0 opacity-100 duration-200 ease-out"
            : "-translate-y-2 opacity-0 duration-150 ease-in pointer-events-none"
        } absolute right-0 z-20 w-40 transform rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <ul
          className={`py-1 ${
            shouldDropdownRender ? "block" : "hidden"
          }`}
        >
          {currencies.map(({ flag, code, title, symbol }, currencyIndex) => (
            <li
              key={`currency-${currencyIndex}`}
              className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCurrencySelect(code)}
            >
              <div className="flex items-center gap-2">
                <Image src={flag} alt={title} width={16} height={12} />
                <span className="font-medium">{symbol}</span>
                <span>{code}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
