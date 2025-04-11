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
 * Tracks a page view event using Mixpanel.
 *
 * @param {string} url - The URL of the page being viewed.
 * @param {Object} [properties={}] - Optional properties to include with the track event.
 * @returns {void}
 *
 * @example
 * mp_track_page('https://example.com/home');
 *
 * @example
 * mp_track_page('https://example.com/about', { category: 'User' });
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
 * @param {string | null} href - The URL of the clicked link. If null, it defaults to 'unknown'.
 * @param {string | null} text - The displayed text of the clicked link. If null, it defaults to 'unknown'.
 * @param {Object} [properties={}] - Additional properties to include in the tracking event.
 * @returns {void}
 *
 * @example
 * mp_track_links('https://example.com', 'Click Me');
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
 * @param {string | null} text - The text of the button clicked. If not provided, 'unknown' is used.
 * @param {Object} [properties={}] - Additional properties to track with the event.
 */
export const mp_track_btns = (text: string | null, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track('Button Click', {
      text: text || 'unknown',
      ...properties,
    });
  }
};

/**
 * Identifies a user with Mixpanel and sets their properties.
 *
 * @param {string} userId - The unique identifier for the user.
 * @param {Object} [properties={}] - Optional object containing user properties to be set.
 */
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
 * @param {Object} [properties={}] - Additional properties to include with the event.
 */
export const mp_track_custom_event = (eventName: string, properties = {}) => {
  if (MIXPANEL_TOKEN && typeof window !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
};

/**
 * Registers super properties with Mixpanel.
 *
 * @function
 * @name mp_register_super_properties
 * @param {Object} [properties={}] - An optional object containing properties to be registered. Defaults to an empty object if not provided.
 * @throws {Error} If the `MIXPANEL_TOKEN` is not defined or `window` is not accessible.
 *
 * Example usage:
 * ```
 * mp_register_super_properties({ user_type: 'premium' });
 * ```
 */
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

/**
 * Tracks form submission using Mixpanel.
 *
 * @param {string} formId - The unique identifier of the form being submitted.
 * @param {Record<string, any>} formData - An object containing form data to be tracked.
 * @returns {void}
 * @throws {Error} If MIXPANEL_TOKEN is not defined or if window is undefined.
 *
 * Example:
 * mp_track_form_submission('contact-form', {
 *   name: 'John Doe',
 *   email: 'john.doe@example.com',
 *   password: '123456' // This field will be sanitized and not tracked
 * });
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
