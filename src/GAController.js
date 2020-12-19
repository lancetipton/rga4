import { buildScriptTags } from './helpers/buildScriptTags'

export const GA4Singleton = {}

/**
 * GAController
 * Class required to manage google analytics 4
 * @class GAController
 * @param {string} gaCode - Google Analytic 4 Measurement ID
 * @param {string} options - Custom analytic config options
 *
 * @returns {Class Instance|Object} GAController instance
 */
export class GAController {
  constructor(gaCode, options = {}) {
    const { gaCodes, ...config } = options
    this.config = config
    this.gaCode = gaCode
    this.extraGaCodes = gaCodes || []
    this.initialized = false
  }

  /**
   * Sets the singleton to initialized, and adds methods
   * @function
   *
   * @returns {Object} GA4Singleton
   */
  setSingleton = () => {
    Object.assign(GA4Singleton, {
      initialized: true,
      pageview: this.pageview,
      event: this.event,
      gtag: this.gtag,
    })

    return GA4Singleton
  }

  /**
   * Return main function for send ga4 events, pageview etc
   * @function
   *
   * @returns {Class} GAController instance
   */
  initialize = () => {
    return new Promise((resolve, reject) => {
      GAController.isInitialized()
        ? reject(new Error('Google Analytics has already been initialized!'))
        : buildScriptTags(this, resolve, reject)
    })
  }

  /**
   * Send pageview event to gtag
   * @function
   * @param {string} path - Name of the action for the event
   * @param {string} location - Extra string identifier of the event
   * @param {string} title - Group the event belongs to
   *
   * @returns {*} Response from the global gtag method
   */
  pageview = (path, location, title) => {
    return this.gtag('event', 'page_view', {
      page_path: path,
      page_location: location || window.location,
      page_title: title || document.title,
    })
  }

  /**
   * Build a predefined event and send to gtag
   * @function
   * @param {string} action - Name of the action for the event
   * @param {string} label - Extra string identifier of the event
   * @param {string} category - Group the event belongs to
   * @param {boolan} [nonInteraction=false] - True if event was not fired from user interaction
   *
   * @returns {*} Response from the global gtag method
   */
  event = (action, label, category, nonInteraction = false) => {
    return this.gtag('event', action, {
      event_label: label,
      event_category: category,
      non_interaction: nonInteraction,
    })
  }

  /**
   * Build event and send to gtag
   * @function
   * @param {string} action - Name of the action for the event
   * @param {Object} props - Properties of the custom event
   *
   * @returns {*} Response from the global gtag method
   */
  customEvent = (action, props = {}) => {
    return this.gtag('event', action, props)
  }

  /**
   * Direct access to ga
   * @function
   * @param {Object} args - Arguments for the global ga method
   *
   * @returns {*} Response from the global ga method
   */
  ga = (...args) => window.ga(...args)

  /**
   * Direct access to gtag
   * @param {Object} args - Arguments for the global gtag method
   *
   * @returns {*} Response from the global gtag method
   */
  gtag = (...args) => window.gtag(...args)
}

/**
 * Check if google analytics is initialized
 * @function
 *
 * @returns {boolean} - True if google analytics is initialized
 */
GAController.isInitialized = () => {
  return GA4Singleton.initialized
}

/**
 * Get RGA4 singleton instance if it's initialized
 * @function
 *
 * @returns {Object} - GA4Singleton
 */
GAController.getInstance = () => {
  return GAController.isInitialized()
    ? GA4Singleton
    : console.warn('Google Analytics is not initialized')
}
