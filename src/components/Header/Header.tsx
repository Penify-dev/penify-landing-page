import { menus } from "@/utils/menuItems";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Scroller as ScrollerLink } from "../Scroller/Scroller";
import { Dropwdown } from "../Dropdown/Dropdown";
import { CurrencyDropdown } from "../Pricing/CurrencyDropdown/CurrencyDropdown";
import { useCurrencyConversion } from "@/hooks/useCurrencyConversion";

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
    <nav className="bg-themeBg sticky start-0 top-0 z-20 w-full py-4 shadow-lg md:py-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <Link href="/" className="inline-block">
          <Image
            src="/penify-logo.svg"
            width={140}
            height={40}
            className="h-10 w-auto md:h-12 xl:h-14"
            alt="Penify Logo"
            priority
          />
        </Link>

        <div className="flex space-x-3 lg:order-2 lg:space-x-0">
          <div className="flex items-center h-10 md:h-auto py-2 px-3">
            <CurrencyDropdown
              currency={currency}
              handleCurrencyChange={handleCurrencyChange}
            />
          </div>
          <Link
            href="https://dashboard.penify.dev/"
            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2 text-center text-sm font-medium text-white transition-all duration-200 ease-in hover:bg-blue-800 focus:outline-none focus:ring-blue-300 md:text-base"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dashboard
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 transition-all duration-200 ease-in hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 md:h-12 md:w-12 lg:hidden"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <IconMenu2 className="md:w-7 md:h-7" />
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
            } mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium lg:mt-0 lg:flex lg:flex-row lg:space-x-8 lg:border-0 lg:bg-transparent lg:p-0`}
          >
            {menus.map(({ title, href, scroller, children }, menuIndex) => (
              <li key={`menu-${menuIndex}`} className="lg:relative">
                {href ? (
                  scroller ? (
                    <ScrollerLink id={href.slice(1)} title={title} />
                  ) : (
                    <Link
                      href={href}
                      className="block rounded px-3 py-2 text-sm capitalize text-gray-800 transition-colors duration-150 ease-in hover:bg-gray-200 hover:text-blue-600 md:text-base lg:text-lg lg:bg-transparent lg:p-0 lg:text-white lg:hover:bg-transparent hover:lg:text-blue-400"
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
