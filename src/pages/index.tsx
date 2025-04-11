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
import { inHouseAnalytics } from "@/utils/gtag";

const inter = Inter({ subsets: ["latin"] });

/**
 * The main component of the application's home page.
 *
 * @function
 * @returns {JSX.Element} - Returns the JSX element for the home page.
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
     * Handles scroll events to track user engagement with page content.
     *
     * This function calculates the current scroll depth as a percentage of the total document height.
     * If the scroll depth falls within a specific threshold (70% to 72%), it triggers two analytics events:
     * one using Google Analytics and another using an in-house analytics system, both with the event category "scroll" and action "scroll".
     *
     * @function
     */
    const handleScroll = () => {
      const scrollDepth = window.scrollY / document.body.offsetHeight;

      if (scrollDepth >= 0.7 && scrollDepth < 0.72) {
        sendGAEvent("event", "scroll", { threshold: "70%" });
        inHouseAnalytics("scroll", { threshold: "70%" });
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
