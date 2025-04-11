import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = "70882d5046727180581f744060d7859c";

export const mp_init = () => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: false, // We'll handle this manually
      persistence: 'localStorage',
      secure_cookie: true,
    });
    return true;
  }
  return false;
};

export const mp_track_page = (url: string, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track('Page View', {
      url: url,
      title: document.title,
      ...properties,
    });
  }
};

export const mp_track_links = (href: string | null, text: string | null, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track('Link Click', {
      href: href || 'unknown',
      text: text || 'unknown',
      ...properties,
    });
  }
};

export const mp_track_btns = (text: string | null, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track('Button Click', {
      text: text || 'unknown',
      ...properties,
    });
  }
};

export const mp_identify_user = (userId: string, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.identify(userId);
    
    // Set user properties
    if (Object.keys(properties).length > 0) {
      mixpanel.people.set(properties);
    }
  }
};

export const mp_track_custom_event = (eventName: string, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
};

export const mp_register_super_properties = (properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.register(properties);
  }
};

export const mp_increment_property = (property: string, value = 1) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.people.increment(property, value);
  }
};

export const mp_track_form_submission = (formId: string, formData: Record<string, any>) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    // Omit sensitive fields
    const sanitizedData = { ...formData };
    const sensitiveFields = ['password', 'credit_card', 'cc', 'cardNumber', 'cvv', 'ssn'];
    
    sensitiveFields.forEach(field => {
      if (field in sanitizedData) {
        delete sanitizedData[field];
      }
    });
    
    mixpanel.track('Form Submitted', {
      form_id: formId,
      ...sanitizedData,
    });
  }
};
