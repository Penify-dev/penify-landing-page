
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: any;
  }
}

async function inHouseAnalytics(event: string, eventRef: string) {
  const cId = localStorage.getItem("cId");
  const email = localStorage.getItem("email");
  if (!cId && !email) {
    return;
  }
  const campaignId = getQueryParameter("oid") || "-1";
  const campaignType = getQueryParameter("ot") || "-1";
  const cIdInt = parseInt(cId || "-1");
  const eId = parseInt(getQueryParameter("eid") || "-1")  ;
  const data = {
    eventType: event,
    cId: cIdInt,
    email,
    eventRef,
    campaignId,
    campaignType,
    meta: JSON.stringify({
      url: window.location.href,
      referrer: document.referrer,
      eId: eId,
    }),
  };

  try {
    // axiosInstance.post("v1/analytics/track", data);
    await fetch("https://production-gateway.snorkell.ai/api/v1/analytics/track", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
  } catch (error) {
    console.log(error);
  }
}

export const pageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
  inHouseAnalytics("pageView", url);
};

export const getQueryParameter = (name: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

export const trackLinkClick = (url: string, email: string, cId: string) => {
  window.gtag("event", "click", {
    event_category: "link",
    event_label: url,
    email_id: email, // Make sure to replace 'dimension1' with the actual index of your custom dimension
    c_id: cId, // Make sure to replace 'dimension2' with the actual index of your custom dimension
  });
  inHouseAnalytics("linkClick", url);
};

export const trackScroll = (value: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll", {
      event_category: "scroll depth",
      event_label: "scrolled 50% on homepage",
      value: value,
    });
  }
  inHouseAnalytics("scroll", "scrolled 50% on homepage");
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
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "submit", {
      event_category: "Contact Form",
      event_label: "contact us form submission",
      user: value,
    });
  }
  inHouseAnalytics("formSubmission", "contact us form submission");
};

/**
 * Tracks the start of a video.
 * @param value - A boolean value indicating whether to track the video start.
 * @throws Will throw an error if the 'window' object is not available or if the 'gtag' function is not defined on the 'window' object.
 * @example
 * trackVideoStart(true);
 */
export const trackVideoStart = (value: boolean) => {
  if (typeof window !== "undefined" && window.gtag && value) {
    window.gtag("event", "video-view", {
      event_category: "Video",
      event_label: "Penify.dev video tuts",
    });
  }
  inHouseAnalytics("videoView", "Penify.dev video tuts");
};