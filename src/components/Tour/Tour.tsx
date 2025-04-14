import { Element } from "react-scroll";
import { YoutubeEmbed } from "../Youtube/Youtube";

/**
 * Represents a functional component that renders a tour section for documentation automation.
 *
 * @returns {React.ReactNode} - The rendered React component.
 */
export default function Tour() {
  return (
    <section>
      <Element
        name="how-it-works"
        id="how-it-works"
        className="w-full py-8 overflow-hidden md:py-16 xl:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center" data-aos="fade-up" data-aos-duration="800">
            <h1 className="mb-4 text-2xl font-bold text-slate-200 md:text-3xl xl:text-4xl">
              Streamline Developer Onboarding: Cut Time by 30% with Automated
              Documentation
            </h1>
            <p className="text-sm text-slate-400 md:text-base lg:text-lg" data-aos="fade-up" data-aos-duration="800">
              Watch How Penify Automates Documentation in Minutes - Take a Quick
              Tour
            </p>
          </div>

          <figure className="mx-auto mt-8 max-w-4xl" data-aos="zoom-in" data-aos-duration="800">
            <div className="bg-bannerBg flex h-11 w-full items-center justify-between rounded-t-lg px-3 md:h-12">
              <div className="flex items-center justify-start space-x-1.5 md:space-x-2">
                <span className="h-3 w-3 rounded-full bg-red-400 md:h-4 md:w-4"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-400 md:h-4 md:w-4"></span>
                <span className="h-3 w-3 rounded-full bg-green-400 md:h-4 md:w-4"></span>
              </div>

              <div className="mx-auto hidden w-2/4 md:block">
                <h3 className="rounded-md bg-gray-200 px-4 py-1 text-center text-xs font-normal md:text-sm">
                  How Penify Automates Documentation?
                </h3>
              </div>
            </div>

            <div className="h-fit w-full border-t-0 bg-gray-100">
              <YoutubeEmbed
                videoId="s32GS0glydA"
                title="How Penify Automates Documentation?"
                poster="maxresdefault"
              />
            </div>
          </figure>
        </div>
      </Element>
    </section>
  );
}
