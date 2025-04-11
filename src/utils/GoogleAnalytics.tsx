import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { getQueryParameter, pageView, trackLinkClick, trackScroll } from "./gtag";

export default function GoogleAnalytics() {
  const router = useRouter();
  const [hasTrackedScroll, setHasTrackedScroll] = useState<boolean>(false);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageView(url);
    };

    // Scroll Tracking for homepage
    const handleTrackScroll = () => {
      if (hasTrackedScroll) return;

      const scrolled = window.scrollY + window.innerHeight;
      const height = document.documentElement.scrollHeight;
      const scrollDepth = Math.trunc((scrolled / height) * 100);

      if (scrollDepth > 50) {
        trackScroll(scrollDepth);
        setHasTrackedScroll(true); // Ensure event is only tracked once
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLinkClick = (event: any) => {
      if (event.target.tagName === 'A') {
        const email = localStorage.getItem('email');
        const cId = localStorage.getItem('cId');
        trackLinkClick(event.target.href, email || "", cId || "");
      }
    };

    const email = getQueryParameter("e");
    if (email) {
      localStorage.setItem("email", email);
      window.gtag('set', 'user_properties', { email_id: email });
    }

    const cId = getQueryParameter('cid');
    if (cId) {
      localStorage.setItem('cId', cId);
      window.gtag('set', 'user_properties', { c_id: cId });
    }

    // Record pageview for first page load
    pageView(window.location.pathname);

    // Record pageview on route change
    router.events.on("routeChangeComplete", handleRouteChange);

    document.addEventListener('click', handleLinkClick);

    if (router.pathname === "/") {
      window.addEventListener("scroll", handleTrackScroll);
    }

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      document.removeEventListener('click', handleLinkClick);
      window.removeEventListener("scroll", handleTrackScroll);
    };
  }, [router.events, router.pathname, hasTrackedScroll]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-NQRNJW5NS7`}
        strategy="afterInteractive"
        async
        defer
      />

      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', "G-NQRNJW5NS7", {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}