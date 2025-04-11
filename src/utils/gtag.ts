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

/**
 * Sends analytics data to the server. This function is designed to track events within an application,
 * capturing user actions, campaign details, and other relevant information.
 *
 * @param {string} event - The type of event being tracked.
 * @param {Dict} eventRef - Additional data related to the event.
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
 * Sends an analytics event for a page view to the in-house analytics system.
 *
 * @param {string} url - The URL of the page being viewed.
 * @returns {void}
 */
export const pageView = (url: string) => {
  inHouseAnalytics("pageView", url);
};

/**
 * Retrieves the value of a query parameter from the current URL.
 *
 * @param {string} name - The name of the query parameter to retrieve.
 * @returns {string | null} - The value of the query parameter if found, otherwise `null`.
 * @example
 * // Assuming the URL is http://example.com?name=John&age=30
 * const name = getQueryParameter('name'); // returns 'John'
 * const age = getQueryParameter('age');  // returns '30'
 */
export const getQueryParameter = (name: string) => {
  if (!isBrowser()){console.log("server side rendering"); return null};
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

/**
 * Tracks a link click event with analytics.
 *
 * @param {string} url - The URL that was clicked.
 * @param {string} email - The user's email address.
 * @param {string} cId - A custom identifier, possibly for user session or campaign tracking.
 *
 * @throws {Error} If any of the parameters are not provided.
 *
 * @example
 * trackLinkClick("https://example.com", "user@example.com", "session123");
 */
export const trackLinkClick = (url: string, email: string, cId: string) => {
  inHouseAnalytics("linkClick", url);
};

/**
 * Tracks scroll event with analytics.
 *
 * This function logs a scroll event to an in-house analytics system.
 * It is intended to be called when the user scrolls a certain percentage of a page, such as 50% on the homepage.
 *
 * @param {number} value - The scroll percentage or other relevant value representing the scroll event.
 * @returns {void}
 */
export const trackScroll = (value: number) => {
  inHouseAnalytics("scroll", "scrolled 50% on homepage");
};

/**
 * Tracks form submission using Google Analytics.
 *
 * @param {string[]} value - An array of strings representing the user input.
 * @throws {Error} Will throw an error if the 'window' object is not available or if 'window.gtag' is not defined.
 */
export const trackFormSubmission = (value: [string]) => {
  inHouseAnalytics("formSubmission", "contact us form submission");
};

/**
 * Tracks the start of a video.
 *
 * @param {boolean} value - A boolean value indicating whether to track the video start.
 * @throws {Error} Will throw an error if the 'window' object is not available or if the 'gtag' function is not defined on the 'window' object.
 */
export const trackVideoStart = (value: boolean) => {
  inHouseAnalytics("videoView", "Penify.dev video tuts");
};