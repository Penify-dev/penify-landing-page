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

export function inHouseAnalytics(event: string, eventRef: Dict) {
  if (!isBrowser()) return;
  
  const cId = localStorage.getItem("cId");
  let email = localStorage.getItem("email");
  
  if(!email) {
    // Generate a unique anonymous ID if email doesn't exist
    let anonymousId = localStorage.getItem("anonymousId");
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

/**
 * Triggers an analytics event for a page view.
 *
 * @param {string} url - The URL of the page being viewed.
 * @throws {Error} - Throws an error if the URL is not provided.
 */
export const pageView = (url: string) => {
  inHouseAnalytics("pageView", {url});
};

export const getQueryParameter = (name: string) => {
  if (!isBrowser()){console.log("server side rendering"); return null};
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

/**
 * Tracks a link click event using in-house analytics.
 *
 * @param {string} url - The URL that was clicked.
 * @param {string} email - The user's email address (optional).
 * @param {string} cId - A custom identifier (optional).
 */
export const trackLinkClick = (url: string, email: string, cId: string) => {
  inHouseAnalytics("linkClick",{ url});
};

/**
 * Tracks scroll events using in-house analytics.
 *
 * @param {number} value - The scroll position value.
 */
export const trackScroll = (value: number) => {
  inHouseAnalytics("scroll", {event:"scrolled 50% on homepage"});
};

/**
 * Tracks form submission using Google Analytics.
 *
 * @param {string[]} value - An array of strings representing the user input.
 * @throws {Error} Will throw an error if the 'window' object is not available or if 'window.gtag' is not defined.
 */
export const trackFormSubmission = (value: [string]) => {
  inHouseAnalytics("formSubmission", {event:"contact us form submission"});
};

/**
 * Tracks the start of a video.
 *
 * @param {boolean} value - A boolean value indicating whether to track the video start.
 * @throws {Error} Will throw an error if the 'window' object is not available or if the 'gtag' function is not defined on the 'window' object.
 */
export const trackVideoStart = (value: boolean) => {
  inHouseAnalytics("videoView", {event:"Penify.dev video tuts"});
};