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
  mp_identify_user,
  mp_track_custom_event,
} from "@/lib/mixpanel";
import { DefaultSeo } from 'next-seo';
import seoConfig from '@/lib/seo.config';
import { Graph, Organization, SoftwareApplication, WebSite, WithContext } from 'schema-dts';
import { getQueryParameter, inHouseAnalytics } from "@/utils/gtag";

// Initialize analytics
mp_init();

// Analytics constants for consistent naming
const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  CLICK: "click",
  SCROLL_DEPTH: "scroll_depth",
  FEATURE_USAGE: "feature_usage",
  TIME_ON_PAGE: "time_on_page",
  FORM_START: "form_start",
  FORM_COMPLETION: "form_completion",
  ERROR: "error",
};

/**
 * @penify
 * Calculates the sum of two numbers
 * @param a The first number
 * @param b The second number
 * @returns The sum of a and b
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  
  // Get current URL for canonical and OG tags
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://penify.dev";
  const currentUrl = `${baseUrl}${router.asPath}`;

  const email = getQueryParameter("e");
  if (email) {
    localStorage.setItem("email", email);
    // window.gtag('set', 'user_properties', { email_id: email });
  }

  const cId = getQueryParameter('cid');
  if (cId) {
    localStorage.setItem('cId', cId);
    // window.gtag('set', 'user_properties', { c_id: cId });
  }
      
  
  // Schema.org structured data
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Penify.dev",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "sameAs": [
      "https://twitter.com/penifydev",
      "https://github.com/penifydev",
      "https://linkedin.com/company/penifydev"
    ],
    "description": "Automate human-like docstring/documentation for Python, Java, TypeScript, JavaScript, Kotlin in GitHub, GitLab, Bitbucket."
  };

  const websiteSchema: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Penify.dev",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query": "required name=search_term_string"
    }
  };

  const softwareAppSchema: WithContext<SoftwareApplication> = {
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
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);

    checkMobile();

    window.addEventListener("resize", checkMobile);

    AOS.init({ disable: isMobile });

    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  useEffect(() => {
    // Initialize session timing
    setSessionStartTime(new Date());
    inHouseAnalytics(ANALYTICS_EVENTS.PAGE_VIEW, {
      page_path: "/",
    });
    /**
     * Handles route changes by logging them and tracking page views, time spent on previous pages,
     * and sending analytics events to Google Analytics (GA), Mixpanel, and in-house analytics.
     *
     * @param {string} url - The URL of the new page being navigated to.
     */
    const handleRouteChange = (url: string) => {
      // Log only on actual route changes
      
      
      // Enhanced page view tracking with more context
      const routeContext = {
        page_path: url,
        page_title: document.title,
        referrer: document.referrer,
        device_type: isMobile ? 'mobile' : 'desktop',
        timestamp: new Date().toISOString(),
      };
      
      // Track in both GA and Mixpanel with consistent data
      sendGAEvent("event", ANALYTICS_EVENTS.PAGE_VIEW, routeContext);
      mp_track_page(url, routeContext);
      inHouseAnalytics(ANALYTICS_EVENTS.PAGE_VIEW, routeContext);
      
      // Track time spent on previous page when navigating
      if (sessionStartTime) {
        const timeSpentSeconds = (new Date().getTime() - sessionStartTime.getTime()) / 1000;
        const timeOnPageContext = {
          seconds: timeSpentSeconds,
          previous_page: document.referrer || 'direct',
        };
        sendGAEvent("event", ANALYTICS_EVENTS.TIME_ON_PAGE, timeOnPageContext);
        mp_track_custom_event(ANALYTICS_EVENTS.TIME_ON_PAGE, timeOnPageContext);
        inHouseAnalytics(ANALYTICS_EVENTS.TIME_ON_PAGE, timeOnPageContext);
        
        // Reset timer for new page
        setSessionStartTime(new Date());
      }
    };
  
    router.events.on("routeChangeComplete", handleRouteChange);
  
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events, isMobile]);

  useEffect(() => {
    // Enhanced click tracking with element context
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const target_anchor = target.closest('a');
      const target_button = target.closest('button');
      
      // Capture click context
      const clickContext = {
        element_text: target.textContent?.trim() || '',
        element_id: target.id || '',
        element_classes: Array.from(target.classList).join(' ') || '',
        page_section: findPageSection(target),
        page_path: router.asPath,
      };

      if (target_anchor) {
        const isExternal = target_anchor.hostname !== window.location.hostname;
        const linkData = {
          ...clickContext,
          href: target_anchor.href,
          link_text: target_anchor.textContent?.trim() || '',
          is_external: isExternal,
        };
        
        sendGAEvent("event", ANALYTICS_EVENTS.CLICK, {
          element_type: "link",
          ...linkData
        });
        mp_track_links(target_anchor.href, target_anchor.textContent, linkData);
        inHouseAnalytics(ANALYTICS_EVENTS.CLICK, linkData);
      }

      if (target_button) {
        const buttonData = {
          ...clickContext,
          button_text: target_button.textContent?.trim() || '',
          button_type: target_button.type || '',
        };
        
        sendGAEvent("event", ANALYTICS_EVENTS.CLICK, {
          element_type: "button",
          ...buttonData,
        });
        mp_track_btns(target_button.textContent, buttonData);
        inHouseAnalytics(ANALYTICS_EVENTS.CLICK, buttonData);
      }
    };

    document.addEventListener("click", handleLinkClick);

    // Add scroll tracking
    const handleScroll = throttle(() => {
      const scrollDepth = calculateScrollDepth();
      if (scrollDepth && scrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
        const scrollContext = {
          depth_percentage: scrollDepth,
          page_path: router.asPath,
        }
        sendGAEvent("event", ANALYTICS_EVENTS.SCROLL_DEPTH, scrollContext);
        mp_track_custom_event(ANALYTICS_EVENTS.SCROLL_DEPTH, scrollContext);
        inHouseAnalytics(ANALYTICS_EVENTS.SCROLL_DEPTH, scrollContext);
      }
    }, 500);

    document.addEventListener("scroll", handleScroll);

    // Track form interactions
    const trackFormInteractions = () => {
      document.querySelectorAll("form").forEach(form => {
        // Track form start
        form.addEventListener("focusin", () => {
          const formContext = {
            form_id: form.id || 'unknown',
            form_name: form.name || 'unknown',
            page_path: router.asPath,
          };
          sendGAEvent("event", ANALYTICS_EVENTS.FORM_START, formContext);
          mp_track_custom_event(ANALYTICS_EVENTS.FORM_START, formContext);
          inHouseAnalytics(ANALYTICS_EVENTS.FORM_START, formContext);
        }, { once: true });
        
        // Track form submissions
        form.addEventListener("submit", () => {
          const formContext = {
            form_id: form.id || 'unknown',
            form_name: form.name || 'unknown',
            page_path: router.asPath,
          };
          sendGAEvent("event", ANALYTICS_EVENTS.FORM_COMPLETION, formContext);
          mp_track_custom_event(ANALYTICS_EVENTS.FORM_COMPLETION, formContext);
        });
      });
    };

    // Run once on page load and after route changes
    trackFormInteractions();
    router.events.on('routeChangeComplete', trackFormInteractions);

    // Track web vitals
    if ('web-vitals' in window) {
      import('web-vitals').then((webVitals) => {
        webVitals.onCLS(metric => {
          const clsContext = {
            metric_name: 'CLS',
            value: metric.value,
            page_path: router.asPath,
          };
          sendGAEvent('event', 'web-vitals', clsContext);
          mp_track_custom_event('web-vitals', clsContext);
          inHouseAnalytics('web-vitals', clsContext);
        });
        webVitals.onINP(metric => {
          const fidContext = {
            metric_name: 'INP',
            value: metric.value,
            page_path: router.asPath,
          };
          sendGAEvent('event', 'web-vitals', fidContext);
          mp_track_custom_event('web-vitals', fidContext);
          inHouseAnalytics('web-vitals', fidContext);
        });
        
        webVitals.onLCP(metric => {
          const lcpContext = {
            metric_name: 'LCP',
            value: metric.value,
            page_path: router.asPath,
          };
          sendGAEvent('event', 'web-vitals', lcpContext);
          mp_track_custom_event('web-vitals', lcpContext);
          inHouseAnalytics('web-vitals', lcpContext);
        });
      });
    }

    return () => {
      document.removeEventListener("click", handleLinkClick);
      document.removeEventListener("scroll", handleScroll);
      router.events.off('routeChangeComplete', trackFormInteractions);
    };
  }, [router]);

  // Helper functions for analytics
  function findPageSection(element: HTMLElement): string {
    // Find nearest section, article, div with id or other container
    const sectionElement = element.closest('section, article, [id], [data-section]');
    if (sectionElement) {
      return sectionElement.id || 
             sectionElement.getAttribute('data-section') || 
             sectionElement.tagName.toLowerCase();
    }
    return 'unknown';
  }

  function calculateScrollDepth(): number | null {
    const scrollTop = window.pageYOffset;
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const totalScrollable = docHeight - winHeight;
    
    if (totalScrollable <= 0) return null;
    
    const scrollPercentage = Math.floor((scrollTop / totalScrollable) * 100);
    
    // Return 25, 50, 75, or 100 based on current scroll percentage
    if (scrollPercentage >= 100) return 100;
    if (scrollPercentage >= 75) return 75;
    if (scrollPercentage >= 50) return 50;
    if (scrollPercentage >= 25) return 25;
    return null;
  }
  
  function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return (...args: Parameters<T>): void => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Identify user if authenticated
  useEffect(() => {
    // Check if user is authenticated (example)
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        // Send user identity to mixpanel
        if (userData.id) {
          mp_identify_user(userData.id, {
            email: userData.email,
            name: userData.name,
            signup_date: userData.signup_date,
            plan: userData.plan,
          });
          
          // Set user ID for Google Analytics
          sendGAEvent('set', 'user_id', userData.id);
        }
      } catch (e) {
        console.error('Error identifying user:', e);
      }
    }
  }, []);

  return (
    <Fragment>
      <DefaultSeo {...seoConfig} 
        canonical={currentUrl}
        openGraph={{
          ...seoConfig.openGraph,
          url: currentUrl,
        }}
      />
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
        id="organization-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <Script
        id="software-app-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppSchema)
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
