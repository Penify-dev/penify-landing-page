import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Banner from "@/components/Banner/Banner";
import FAQ from "@/components/FAQ/FAQ";
import Features from "@/components/Features/Features";
import Tour from "@/components/Tour/Tour";
import Hero from "@/components/Hero/Hero";
import Pricing from "@/components/Pricing/Pricing";
import { sendGAEvent } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

/**
 * Main component that renders the home page.
 *
 * @returns {JSX.Element} - The rendered JSX element for the home page.
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    /**
     * Handles scroll event to track user engagement.
     *
     * This function calculates the scroll depth of the page as a percentage of the total height.
     * If the scroll depth falls within a specific range (70% to 72%), it triggers a Google Analytics event
     * with the category "event" and action "scroll", including the threshold as metadata.
     *
     * @function handleScroll
     * @returns {void} - This function does not return any value.
     */
    const handleScroll = () => {
      const scrollDepth = window.scrollY / document.body.offsetHeight;

      if (scrollDepth >= 0.7 && scrollDepth < 0.72) {
        sendGAEvent("event", "scroll", { threshold: "70%" });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isLoading ? (
    <div id="preloader">
      <div className="loader"></div>
    </div>
  ) : (
    <div className={`app-wrapper ${inter.className} bg-themeBg`}>
      <Banner />
      <Header />
      <main>
        <Hero />
        <Tour />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
