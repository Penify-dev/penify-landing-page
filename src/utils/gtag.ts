import { Dict } from "mixpanel-browser";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: any;
  }
}

// Helper to check if code is running in browser environment
const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && window.document !== undefined;
};

// Utility function to add referrer parameter to URLs
export function addReferrerToUrl(url: string): string {
  if (!url) return url;
  
  try {
    const urlObj = new URL(url);
    let aId = localStorage.getItem("aId");
    const email = localStorage.getItem("email");
    if(email) {
      aId = email;
    }

    // Only add the referrer if it's an external URL and doesn't already have the parameter
    if (urlObj.hostname !== window.location.hostname && !urlObj.searchParams.has('ref')) {
      urlObj.searchParams.append('ref', 'penify_landing');
      if(aId) {
        urlObj.searchParams.append('aId', aId);
      }
    }
    return urlObj.toString();
  } catch (e) {
    // If the URL is invalid or relative, just return it as is
    return url;
  }
}

export function inHouseAnalytics(event: string, eventRef: Dict) {
  if (!isBrowser()) return;
  // if localhost, return
  if (window.location.hostname === "localhost") return;
  
  const cId = localStorage.getItem("cId");
  let email = localStorage.getItem("email");
  
  if(!email) {
    // Generate a unique anonymous ID if email doesn't exist
    let anonymousId = localStorage.getItem("aId");
    if (!anonymousId) {
      // Create unique ID combining timestamp and random string
      anonymousId = `an_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem("aId", anonymousId);
    }
    email = anonymousId; // Use this as the identifier instead of email
  }
  
  const campaignId = getQueryParameter("oid") || "-1";
  const campaignType = getQueryParameter("ot") || "-1";
  const cIdInt = parseInt(cId || "-1");
  const eId = parseInt(getQueryParameter("eid") || "-1")  ;
  const data = {
    eventType: event,
    cId: cIdInt,
    email,
    eventRef: JSON.stringify(eventRef),
    campaignId,
    campaignType,
    meta: JSON.stringify({
      url: isBrowser() ? window.location.href : '',
      referrer: isBrowser() ? document.referrer : '',
      eId: eId,
    }),
  };

  try {
    // axiosInstance.post("v1/analytics/track", data);
    fetch("https://production-gateway.snorkell.ai/api/v1/analytics/track", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      // Handle response if needed
    })
    .catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}

export const pageView = (url: string) => {
  inHouseAnalytics("pageView", {url});
};

export const getQueryParameter = (name: string) => {
  if (!isBrowser()){console.log("server side rendering"); return null};
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

export const trackLinkClick = (url: string, email: string, cId: string) => {
  inHouseAnalytics("linkClick",{ url});
};

export const trackScroll = (value: number) => {
  inHouseAnalytics("scroll", {event:"scrolled 50% on homepage"});
};

/**
 * Tracks form submission using Google Analytics.
 *
 * @param value - An array of strings representing the user input.
 * @throws Will throw an error if the 'window' object is not available or if 'window.gtag' is not defined.
 * @example
 *
 * // Example usage:
 * trackFormSubmission(['user input 1', 'user input 2']);
 */
export const trackFormSubmission = (value: [string]) => {
  inHouseAnalytics("formSubmission", {event:"contact us form submission"});
};

/**
 * Tracks the start of a video.
 * @param value - A boolean value indicating whether to track the video start.
 * @throws Will throw an error if the 'window' object is not available or if the 'gtag' function is not defined on the 'window' object.
 * @example
 * trackVideoStart(true);
 */
export const trackVideoStart = (value: boolean) => {
  inHouseAnalytics("videoView", {event:"Penify.dev video tuts"});
};