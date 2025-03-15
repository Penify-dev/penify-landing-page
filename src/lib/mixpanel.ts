import mixpanel from "mixpanel-browser";

// initialize mixpanel
const mixpanelToken = "70882d5046727180581f744060d7859c";

export const mp_init = () =>
  mixpanel.init(mixpanelToken, {
    track_pageview: false,
    persistence: "cookie",
  });

export const mp_track_page = (url: string) => {
  mixpanel.track_pageview({
    "Page View": url,
  });
};

export const mp_track_links = (url: string, text: string | null) => {
  mixpanel.track_links("a", "Links Clicked", {
    link_click: url,
    link_title: text,
  });
};

export const mp_track_btns = (text: string | null) => {
  mixpanel.track("Button Clicked", {
    btn_text: text,
  });
};

export const mp_track_scroll_depth = (threshold: string) => {
  mixpanel.track("Page Scrolled", {
    threshold,
  });
};

export const mp_track_video_play = () => {
  mixpanel.track("Demo Video View");
};

export const mp_track_contact_form = (username: string, email: string) => {
  mixpanel.track_forms("#contact_us", "Contact Form Submitted", {
    username,
    email,
  });
};

// New function for feature zoom tracking
export const mp_track_feature_zoom = (featureName: string) => {
  mixpanel.track("Feature Zoomed", {
    feature_name: featureName,
    timestamp: new Date().toISOString(),
  });
};
