import Link from "next/link";
import Image from "next/image";
import Flow from "../Flow/Flow";
import { Dropwdown } from "../Dropdown/Dropdown";
import { vendors } from "@/utils/teamItems";
import { useCurrencyConversion } from "@/hooks/useCurrencyConversion";
import PRICING from "@/utils/pricing.json";

/**
 * A functional component that renders the hero section of the application.
 * This section includes a call-to-action for documentation, installation instructions,
 * and a request demo button.
 *
 * @function Hero
 * @returns {JSX.Element} - The rendered JSX element.
 */
export default function Hero() {
  const {
      currency,
      handleCurrencyChange,
      getCurrency,
      // showLocationPopup,
      // handleAcceptLocation,
      // handleDeclineLocation,
    } = useCurrencyConversion();
  
  return (
    <section className="w-full py-6 overflow-hidden md:py-16 xl:py-24">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col lg:flex-row flex-wrap -m-4 sm:-m-8">
          <div
            className="w-full lg:w-2/5 p-4 sm:p-8"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="inline-block mb-4 sm:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 font-semibold bg-primary-600 rounded-e-full rounded-b-full">
              <h3 className="text-xs md:text-sm xl:text-base text-white">
                Do you really need to write documentation?
              </h3>
            </div>

            <h1 className="mb-3 sm:mb-4 md:mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-200">
             Docs Pipeline that set devs up for <span className="text-accent-400">+ success</span>
            </h1>

            <p className="mb-4 sm:mb-6 md:mb-8 text-sm text-slate-400 md:text-base lg:text-lg">
              From Pull Requests to API Docs, Penify Instantly Generates and
              Updates Comprehensive Documentation — Streamlining Your Codebase
              and Saving You Time.
            </p>

            <p className="mb-4 sm:mb-6 md:mb-8 text-sm text-slate-400 md:text-base lg:text-lg">
            <span className="bg-secondary-100 text-secondary-800 font-bold px-2 py-1 rounded-md hover:bg-secondary-200 cursor-pointer transition duration-300 text-xs sm:text-sm md:text-base">
              <a href="https://github.com/apps/penify-dev/installations/select_target" target="_blank">Now "Document" your entire Repository in 0$.</a>
            </span>
          </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 -my-2.5">
              <Dropwdown title="Easy Install" items={vendors} type="hero" />

              <Link
                href="https://calendly.com/sumansaurabh-snorkell/intro-snorkell-i"
                className="rounded-lg bg-primary-700 px-4 py-2.5 sm:px-5 sm:py-3 text-center text-xs md:text-sm xl:text-base font-medium text-white transition-all duration-200 ease-in hover:bg-primary-800 focus:outline-none focus:ring-primary-300 self-start w-full sm:w-fit flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image 
                  src="/icons/calender-icon.svg" 
                  alt="Calendar" 
                  width={16} 
                  height={16} 
                  className="text-white" 
                />
                Request a Demo
              </Link>
            </div>
          </div>
          <div
            className="hidden lg:block w-full lg:w-3/5 p-3 sm:p-6 lg:p-0 overflow-x-hidden overflow-y-visible mt-4 lg:mt-0"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <Flow />
          </div>
        </div>
      </div>
    </section>
  );
}
