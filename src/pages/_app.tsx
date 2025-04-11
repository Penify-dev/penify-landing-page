import "aos/dist/aos.css";
import "@/styles/globals.css";
import "@xyflow/react/dist/style.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import AOS from "aos";
import Script from "next/script";
import { sendGAEvent, GoogleAnalytics } from "@next/third-parties/google";
import { useRouter } from "next/router";
import {
  mp_init,
  mp_track_btns,
  mp_track_links,
  mp_track_page,
} from "@/lib/mixpanel";
// import GoogleAnalytics from "@/utils/GoogleAnalytics";

mp_init();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  
  // Get current URL for canonical and OG tags
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://penify.dev";
  const currentUrl = `${baseUrl}${router.asPath}`;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    AOS.init({ disable: isMobile });

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendGAEvent("event", "page_view", { page_path: url });
      mp_track_page(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target_anchor = event.target as HTMLAnchorElement;
      const target_button = event.target as HTMLButtonElement;

      if (target_anchor.tagName === "A") {
        sendGAEvent("event", "click", {
          click_link: target_anchor.href || target_anchor.textContent,
        });
        mp_track_links(target_anchor.href, target_anchor.textContent);
      }

      if (target_button.tagName === "BUTTON") {
        sendGAEvent("event", "click", {
          click_btn: target_button.textContent,
        });
        mp_track_btns(target_button.textContent);
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Penify.dev | Automated Documentation Generation</title>
        <meta
          name="description"
          content="Automate human-like docstring/documentation for Python, Java, TypeScript, JavaScript, Kotlin in GitHub, GitLab, Bitbucket."
        />
        <meta
          name="keywords"
          content="Penify.dev, ai docstring, Automated Documentation, GitHub Integration, Source Code Documentation, Intelligent Tracking, Smart Generation, Programming Languages, Python, JavaScript, TypeScript, Java, Kotlin, Real-Time Documentation, Privacy-Focused"
        />
        
        {/* Standard Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Penify.dev" />
        <meta name="language" content="English" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#000000" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Penify.dev | Automated Documentation Generation"
        />
        <meta
          property="og:description"
          content="Automate human-like docstring/documentation for Python, Java, TypeScript, JavaScript, Kotlin in GitHub, GitLab, Bitbucket."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Penify.dev" />
        <meta
          property="og:image"
          content={`${baseUrl}/images/penify-og-image.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@penifydev" />
        <meta name="twitter:creator" content="@penifydev" />
        <meta
          name="twitter:title"
          content="Penify.dev | Automated Documentation Generation"
        />
        <meta
          name="twitter:description"
          content="Automate human-like docstring/documentation for Python, Java, TypeScript, JavaScript, Kotlin in GitHub, GitLab, Bitbucket."
        />
        <meta
          name="twitter:image"
          content={`${baseUrl}/images/penify-og-image.jpg`}
        />

        {/* Favicon Tags */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      {/* JSON-LD Structured Data */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Penify.dev",
            "description": "Automate human-like docstring/documentation for Python, Java, TypeScript, JavaScript, Kotlin in GitHub, GitLab, Bitbucket.",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Penify.dev",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/logo.png`
              }
            }
          })
        }}
      />

      <GoogleAnalytics gaId="G-NQRNJW5NS7" />

      {/* HubSpot widget container - reserves space */}
      <div id="hubspot-widget-placeholder"></div>
      
      {/* Hubspot analytics - using improved loading strategy */}
      <Script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js-na1.hs-scripts.com/44651459.js"
        strategy="lazyOnload"
        onLoad={() => {
          document.body.classList.add('hubspot-loaded');
        }}
      />

      <Component {...pageProps} />
    </Fragment>
  );
}
