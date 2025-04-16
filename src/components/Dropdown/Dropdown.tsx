import {
  IconBrandBitbucket,
  IconBrandGithub,
  IconChevronDown,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addReferrerToUrl } from "@/utils/gtag";

interface DropwdownProps {
  title: string;
  items:
    | {
        title: string;
        href: string;
        vendor?: "github" | "bitbucket";
      }[]
    | null;
  type: string;
}

interface DropdownStylesTypes {
  [key: string]: {
    menu: string;
    openMenu: string;
    wrapper: string;
    chevron: string;
    link: string;
    openBox: string;
  };
}

const dropdownStyles: DropdownStylesTypes = {
  nav: {
    menu: "flex w-full items-center justify-between px-3 py-2 text-sm text-gray-800 transition-all duration-200 ease-in hover:bg-gray-200 hover:text-blue-600 md:text-base lg:w-auto lg:border-0 lg:p-0 lg:text-lg lg:text-white lg:hover:bg-transparent lg:hover:text-blue-400",
    openMenu: "bg-gray-200 lg:bg-transparent lg:text-blue-400",
    wrapper: "",
    chevron: "",
    link: "",
    openBox: "my-2 translate-y-0 opacity-100 duration-300 ease-out",
  },
  hero: {
    menu: "flex items-center justify-center gap-x-1 rounded-lg bg-blue-700 px-5 py-3 text-center text-xs font-medium text-white transition-all duration-200 ease-in hover:bg-blue-800 focus:outline-none focus:ring-blue-300 md:text-sm xl:text-base w-full sm:w-[174px] md:w-[182px]",
    openMenu: "",
    wrapper: "inline-block",
    chevron: "w-4 h-4 xl:w-6 xl:h-6",
    link: "justify-center sm:justify-start",
    openBox: "mt-2 translate-y-0 opacity-100 duration-300 ease-out",
  },
};

export function Dropwdown({ title, items, type }: DropwdownProps) {
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
    <div className={`${dropdownStyles[type].wrapper} relative`}>
      <button
        type="button"
        className={`${dropdownStyles[type].menu} ${
          isMenuOpen ? dropdownStyles[type].openMenu : ""
        }`}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {title}
        <span
          className={`${isMenuOpen ? "rotate-180" : ""} transition-transform`}
        >
          <IconChevronDown className={`${dropdownStyles[type].chevron}`} />
        </span>
      </button>

      <div
        className={`z-10 w-full -translate-y-2 transform divide-y divide-gray-100 rounded-lg bg-white font-normal opacity-0 shadow duration-200 ease-in lg:absolute ${
          isMenuOpen ? dropdownStyles[type].openBox : ""
        } `}
      >
        <ul
          className={`py-2 text-sm font-medium ${
            shouldMenuRender ? "block" : "hidden"
          }`}
        >
          {items &&
            items.map(({ title, href, vendor }, itemIndex) => (
              <li key={`dropdown-${type}-${itemIndex}`}>
                <Link
                  href={addReferrerToUrl(href)}
                  className={`flex items-center gap-x-1 rounded px-3 py-2 capitalize text-gray-800 transition-colors duration-150 ease-in hover:bg-gray-200 hover:text-blue-700 ${dropdownStyles[type].link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vendor === "github" && (
                    <IconBrandGithub className="w-4 h-4 md:w-6 sm:h-6" />
                  )}
                  {vendor === "bitbucket" && (
                    <IconBrandBitbucket className="w-4 h-4 md:w-6 sm:h-6" />
                  )}
                  {title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
