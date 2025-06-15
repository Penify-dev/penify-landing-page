import { menus } from "@/utils/menuItems";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Scroller as ScrollerLink } from "../Scroller/Scroller";
import { Dropwdown } from "../Dropdown/Dropdown";
import { CurrencyDropdown } from "../Pricing/CurrencyDropdown/CurrencyDropdown";
import { useCurrencyConversion } from "@/hooks/useCurrencyConversion";
import { addReferrerToUrl } from "@/utils/gtag";

export default function Header() {
  const { currency, handleCurrencyChange, getCurrency } =
    useCurrencyConversion();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [shouldMenuRender, setShouldMenuRender] = useState<boolean>(false);

  useEffect(() => {
    if (isMenuOpen) {
      setShouldMenuRender(true);
    } else {
      const timeoutId = setTimeout(() => setShouldMenuRender(false), 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isMenuOpen]);

  return (
    <nav className="bg-themeBg sticky start-0 top-0 z-20 w-full py-3 shadow-lg md:py-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-2 sm:px-4">
        <Link href="/" className="inline-block">
          <Image
            src="/penify-logo.svg"
            width={140}
            height={40}
            className="h-8 w-auto md:h-12 xl:h-14"
            alt="Penify Logo"
            priority
          />
        </Link>

        <div className="flex items-center space-x-1 sm:space-x-2 lg:order-2">
          {/* Currency dropdown integrated into header actions */}
          <div className="border-r border-primary-800/40 pr-1 mr-1">
            <CurrencyDropdown
              currency={currency}
              handleCurrencyChange={handleCurrencyChange}
            />
          </div>

          <Link
            href={addReferrerToUrl("https://dashboard.penify.dev/")}
            className="inline-flex items-center rounded-lg bg-primary-600 px-3 py-1.5 sm:px-5 sm:py-2 text-center text-xs sm:text-sm font-medium text-white transition-all duration-200 ease-in hover:bg-primary-700 focus:outline-none focus:ring-primary-300 md:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            SingIn
          </Link>

          <button
            type="button"
            className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg p-1.5 sm:p-2 text-sm text-gray-500 transition-all duration-200 ease-in hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700 md:h-12 md:w-12 lg:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <IconMenu2 className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>

        <div
          className={`${
            isMenuOpen
              ? "ease-out duration-300 opacity-100 translate-y-0 my-2"
              : "ease-in duration-200 opacity-0 -translate-y-2"
          } w-full transform items-center justify-between lg:order-1 lg:flex lg:w-auto lg:translate-y-0 lg:opacity-100 `}
        >
          <ul
            className={`${
              shouldMenuRender ? "block" : "hidden"
            } mt-4 flex flex-col rounded-lg border border-primary-100/10 bg-primary-50/5 p-4 font-medium lg:mt-0 lg:flex lg:flex-row lg:space-x-8 lg:border-0 lg:bg-transparent lg:p-0`}
          >
            {menus.map(({ title, href, scroller, children }, menuIndex) => (
              <li key={`menu-${menuIndex}`} className="lg:relative">
                {href ? (
                  scroller ? (
                    <ScrollerLink id={href.slice(1)} title={title} />
                  ) : (
                    <Link
                      href={href}
                      className="block rounded px-3 py-2 text-sm capitalize text-gray-800 transition-colors duration-150 ease-in hover:bg-primary-100 hover:text-primary-600 md:text-base lg:text-lg lg:bg-transparent lg:p-0 lg:text-white lg:hover:bg-transparent hover:lg:text-secondary-400"
                    >
                      {title}
                    </Link>
                  )
                ) : (
                  <Dropwdown title={title} items={children} type="nav" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
