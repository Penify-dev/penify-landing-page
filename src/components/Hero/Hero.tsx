import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Flow from "../Flow/Flow";
import { Dropwdown } from "../Dropdown/Dropdown";
import { vendors } from "@/utils/teamItems";
import { useCurrencyConversion } from "@/hooks/useCurrencyConversion";

export default function Hero() {
  const {
    currency,
    handleCurrencyChange,
    getCurrency,
  } = useCurrencyConversion();

  return (
    <section className="relative w-full pt-16 pb-12 overflow-hidden md:pt-20 xl:pt-24">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-mesh-1 opacity-30" aria-hidden="true" />
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-gradient-to-b from-green-500/10 via-transparent to-transparent blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-gradient-to-t from-purple-500/10 via-transparent to-transparent blur-3xl" aria-hidden="true" />

      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-12 xl:gap-16">
          {/* Content column */}
          <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
            <div className="max-w-xl mx-auto lg:mx-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center px-4 py-2 space-x-1 font-semibold bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full border border-blue-500/20 shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                  <h3 className="text-sm md:text-base font-medium text-green-400">
                    Stop writing manual documentation
                  </h3>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  Docs Pipeline that set devs up for <span className="gradient-text text-glow">+ success</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                  From Pull Requests to API Docs, Penify Instantly Generates and
                  Updates Comprehensive Documentation — Streamlining Your Codebase
                  and Saving You Time.
                </p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inline-flex px-4 py-2 text-yellow-800 font-medium bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg shadow-sm hover:shadow-yellow-200/20 transition-all duration-300"
                >
                  <Link 
                    href="https://github.com/apps/penify-dev/installations/select_target" 
                    target="_blank"
                    className="flex items-center"
                  >
                    Now "Document" your entire Repository in less than 1$
                    <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </motion.div>

                <div className="flex flex-wrap items-center gap-4">
                  <Dropwdown 
                    title="Get Started" 
                    items={vendors} 
                    type="hero" 
                    className="btn-primary" 
                  />

                  <Link
                    href="https://calendly.com/sumansaurabh-snorkell/intro-snorkell-i"
                    className="btn-secondary group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image 
                      src="/icons/calender-icon.svg" 
                      alt="Calendar" 
                      width={18} 
                      height={18} 
                      className="mr-2 text-white" 
                    />
                    <span>Request a Demo</span>
                  </Link>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-slate-400">Trusted by engineering teams at</p>
                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    {['Company 1', 'Company 2', 'Company 3'].map((company, idx) => (
                      <div key={idx} className="h-6 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Flow diagram column with proper spacing */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full lg:w-3/5"
          >
            <div className="relative p-2 sm:p-4 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 shadow-xl">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 right-0 h-10 flex items-center px-4 border-b border-slate-800/50">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
              </div>
              
              {/* Flow container with fixed height to prevent overlapping */}
              <div className="pt-10 h-[700px] overflow-hidden">
                <Flow />
              </div>
              
              {/* Interactive elements */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/70 backdrop-blur-sm rounded-full text-xs text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Interactive Diagram</span>
                </div>
                
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/70 backdrop-blur-sm rounded-full text-xs text-slate-300">
                  <span>Try clicking on different paths</span>
                  <ChevronRightIcon className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
