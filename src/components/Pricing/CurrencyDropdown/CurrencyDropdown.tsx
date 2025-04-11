import Image from "next/image";
import { useEffect, useState } from "react";
import { CurrencyOptions } from "../../../hooks/useCurrencyConversion";
import US from "public/icons/country/US.svg";
import IN from "public/icons/country/IN.svg";

interface CurrencyDropdownProps {
  currency: CurrencyOptions;
  handleCurrencyChange: (code: CurrencyOptions) => void;
}

interface CurrencyTypes {
  flag: string;
  code: CurrencyOptions;
  title: string;
}

const currencies: CurrencyTypes[] = [
  {
    flag: '/icons/country/US.svg',
    code: "USD",
    title: "US",
  },
  {
    flag: "public/icons/country/IN.svg",
    code: "INR",
    title: "India",
  },
];

export function CurrencyDropdown({
  currency,
  handleCurrencyChange,
}: CurrencyDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [shouldDropdownRender, setShouldDropdownRender] =
    useState<boolean>(false);

  useEffect(() => {
    if (isDropdownOpen) {
      setShouldDropdownRender(true);
    } else {
      const timeoutId = setTimeout(() => setShouldDropdownRender(false), 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isDropdownOpen]);

  return (
    <div className="w-fit flex flex-col items-center relative">
      <button
        type="button"
        className="inline-flex items-center rounded-lg bg-slate-700 px-5 py-3 text-center text-xs font-medium text-white transition-all duration-200 ease-in hover:bg-slate-800 focus:outline-none md:text-sm xl:text-base"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
      >
        Selected Currency:{" "}
        <span className="font-semibold ms-1">{currency}</span>
      </button>

      <div
        id="currencyDropdown"
        className={`${
          isDropdownOpen
            ? "my-2 translate-y-0 opacity-100 duration-300 ease-out"
            : "-translate-y-2 opacity-0 duration-200 ease-in"
        } z-10 w-full transform divide-y divide-gray-100 rounded-lg bg-white font-normal shadow max-w-32 absolute top-11`}
      >
        <ul
          className={`py-2 text-xs font-medium md:text-sm lg:text-base ${
            shouldDropdownRender ? "block" : "hidden"
          }`}
        >
          {currencies.map(({ flag, code, title }, currencyIndex) => (
            <li
              key={`currency-${currencyIndex}`}
              className="flex items-center gap-x-2 rounded px-3 py-2 capitalize text-gray-800 transition-colors duration-150 ease-in hover:bg-gray-200 hover:text-blue-700 cursor-pointer"
              onClick={() => handleCurrencyChange(code)}
            >
              <Image src={flag} alt={title} width={18} height={12} />
              {code}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
