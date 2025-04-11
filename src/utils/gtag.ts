import { Dict } from "mixpanel-browser";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: any;
  }
}

// Helper to check if code is running in browser environment
/**
 * Determines if the current environment is a browser.
 *
 * @returns {boolean} - True if the code is running in a browser environment, false otherwise.
 *
 * @example
 * if (isBrowser()) {
 *   console.log('Running in a browser');
 * } else {
 *   console.log('Not running in a browser');
 * }
 */
const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && window.document !== undefined;
};

/**
 * Tracks an event with analytics data.
 *
 * @param {string} event - The type of the event to track.
 * @param {Dict} eventRef - Additional reference data for the event.
 * @returns {void}
 */
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
 * Tracks a page view event using internal analytics.
 *
 * @param {string} url - The URL of the page being viewed.
 */
export const pageView = (url: string) => {
  inHouseAnalytics("pageView", {url});
};

/**
 * Retrieves a query parameter value from the current URL.
 *
 * @param {string} name - The name of the query parameter to retrieve.
 * @returns {(string | null)} The value of the query parameter, or null if not found.
 * @example
 * const paramValue = getQueryParameter('exampleParam');
 * console.log(paramValue); // Output will depend on the current URL's query string
 *
 * @note This function is designed to be used in a browser environment. If server-side rendering (SSR) is detected, it logs a message and returns null.
 */
export const getQueryParameter = (name: string) => {
  if (!isBrowser()){console.log("server side rendering"); return null};
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

/**
 * Tracks a link click event.
 *
 * @param {string} url - The URL that was clicked.
 * @param {string} email - The user's email address.
 * @param {string} cId - A custom identifier for the click event.
 * @returns {void}
 * @throws {Error} If any of the parameters are invalid.
 */
export const trackLinkClick = (url: string, email: string, cId: string) => {
  inHouseAnalytics("linkClick",{ url});
};

/**
 * Tracks a scroll event using in-house analytics.
 *
 * @param {number} value - The scroll value to track.
 * @throws {Error} If the provided value is not a number.
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
 * @param {boolean} value - A boolean value indicating whether to track the video start.
 * @throws Will throw an error if the 'window' object is not available or if the 'gtag' function is not defined on the 'window' object.
 */
export const trackVideoStart = (value: boolean) => {
  inHouseAnalytics("videoView", {event:"Penify.dev video tuts"});
};