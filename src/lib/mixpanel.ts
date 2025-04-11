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

/**
 * Triggers an event to track page views using Mixpanel.
 *
 * @param {string} url - The URL of the page being tracked.
 * @param {Object} [properties={}] - Additional properties to include in the event payload.
 * @throws {Error} If MIXPANEL_TOKEN is not defined or window is undefined.
 */
export const mp_track_page = (url: string, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track('Page View', {
      url: url,
      title: document.title,
      ...properties,
    });
  }
};

/**
 * Tracks link clicks using Mixpanel.
 *
 * This function is used to send data about a link click event to Mixpanel. It checks if the MIXPANEL_TOKEN
 * is defined and if the window object exists before attempting to track the event. If either condition is not met,
 * it does nothing.
 *
 * @param {string | null} href - The URL of the clicked link. If null, 'unknown' is used.
 * @param {string | null} text - The visible text of the clicked link. If null, 'unknown' is used.
 * @param {Object} [properties={}] - Additional properties to send with the event. These can include any relevant data you wish to track.
 */
export const mp_track_links = (href: string | null, text: string | null, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track('Link Click', {
      href: href || 'unknown',
      text: text || 'unknown',
      ...properties,
    });
  }
};

/**
 * Tracks a button click event using Mixpanel.
 *
 * @param {string | null} text - The text of the button that was clicked. If not provided, defaults to 'unknown'.
 * @param {Object} [properties={}] - Additional properties to include with the event.
 */
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

/**
 * Tracks a custom event using Mixpanel.
 *
 * @param {string} eventName - The name of the event to track.
 * @param {Object} [properties={}] - An optional object containing properties associated with the event.
 * @returns {void}
 *
 * @example
 * mp_track_custom_event('UserRegistration', { email: 'user@example.com' });
 */
export const mp_track_custom_event = (eventName: string, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
};

/**
 * Registers super properties with Mixpanel.
 *
 * @param {Object} [properties={}] - An object containing the properties to register. Defaults to an empty object.
 * @returns {void}
 * @throws Will throw an error if MIXPANEL_TOKEN is not defined or if the window object is not available.
 * @example
 * mp_register_super_properties({ user_id: '123' });
 */
export const mp_register_super_properties = (properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.register(properties);
  }
};

/**
 * Increment a user property by a specified value using Mixpanel.
 *
 * @param {string} property - The property to increment.
 * @param {number} [value=1] - The amount to increment the property by. Defaults to 1.
 */
export const mp_increment_property = (property: string, value = 1) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.people.increment(property, value);
  }
};

/**
 * Tracks form submission using Mixpanel.
 *
 * @param {string} formId - The ID of the form that was submitted.
 * @param {Record<string, any>} formData - The data from the form that was submitted.
 * @returns {void}
 *
 * @example
 * mp_track_form_submission('loginForm', { username: 'user123', password: 'pass123' });
 */
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
