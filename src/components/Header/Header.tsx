import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { menus } from "@/utils/menuItems";

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isScrolled = scrollPosition > 10;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return isMounted ? (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? "bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/penify-logo.svg"
                alt="Penify Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-semibold text-white">Penify.dev</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {menus.map((item) => (
              <div key={item.id} className="relative group">
                {item.type === "link" ? (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-base text-slate-300 hover:text-white transition-colors relative"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                ) : (
                  <ScrollLink
                    to={item.href}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="px-4 py-2 text-base text-slate-300 hover:text-white transition-colors cursor-pointer relative"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </ScrollLink>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://github.com/apps/penify-dev/installations/select_target"
              target="_blank"
              className="px-4 py-1.5 text-sm text-slate-300 hover:text-white border border-slate-700 rounded-md transition-colors hover:border-slate-600"
            >
              Try For Free
            </Link>
            <Link
              href="https://github.com/apps/penify-dev/installations/select_target"
              target="_blank"
              className="px-4 py-1.5 text-sm text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-md shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50"
          >
            <nav className="container mx-auto px-4 pb-6 pt-2 flex flex-col space-y-4">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.type === "link" ? (
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <ScrollLink
                      to={item.href}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className="block px-4 py-2 text-base text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </ScrollLink>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <Link
                  href="https://github.com/apps/penify-dev/installations/select_target"
                  target="_blank"
                  className="w-full px-4 py-2 text-center text-slate-300 hover:text-white border border-slate-700 rounded-md transition-colors hover:border-slate-600"
                >
                  Try For Free
                </Link>
                <Link
                  href="https://github.com/apps/penify-dev/installations/select_target"
                  target="_blank"
                  className="w-full px-4 py-2 text-center text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-md shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/30"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  ) : null;
}
