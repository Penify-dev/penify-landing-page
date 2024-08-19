import Link from "next/link";
import Flow from "../Flow/Flow";

export default function Hero() {
  return (
    <section className="w-full py-8 overflow-hidden md:py-16 xl:py-24 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row flex-wrap -m-8">
          <div className="w-full lg:w-1/2 p-8">
            <div className="inline-block mb-6 px-4 py-2 font-semibold bg-[#4569e7] rounded-e-full rounded-b-full">
              <h3 className="text-xs md:text-sm xl:text-base text-slate-200">
                Revolutionize Developer Workflow
              </h3>
            </div>

            <h1 className="mb-4 md:mb-6 font-bold text-2xl md:text-3xl lg:text-4xl text-slate-200">
              Automated Documentation for Every Step of the Process
            </h1>

            <p className="mb-6 md:mb-8 text-sm text-slate-400 md:text-base lg:text-lg">
              From Pull Requests to API Docs, Penify Instantly Generates and
              Updates Comprehensive Documentation — Streamlining Your Codebase
              and Saving You Time.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 -my-2.5">
              <Link
                href="https://github.com/apps/penify-dev/installations/select_target"
                className="rounded-lg bg-blue-700 px-5 py-3 text-center text-xs md:text-sm xl:text-base font-medium text-white transition-all duration-200 ease-in hover:bg-blue-800 focus:outline-none focus:ring-blue-300"
              >
                Get Started
              </Link>

              <Link
                href="https://calendly.com/sumansaurabh-snorkell/intro-snorkell-i"
                className="rounded-lg bg-slate-700 px-5 py-3 text-center text-xs md:text-sm xl:text-base font-medium text-white transition-all duration-200 ease-in hover:bg-slate-800 focus:outline-none focus:ring-slate-300"
              >
                Request a Demo
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <Flow />
          </div>
        </div>
      </div>
    </section>
  );
}
