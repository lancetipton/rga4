/**
 * @import {GA4Singleton, PageViewEvent, UAEvent} from '../../index.d.ts'
 */

import { buildScriptTags } from '../helpers/buildScriptTags'
import { mapEventKeys } from '../helpers/mapEventKeys'
import { GA4Singleton } from './GA4Singleton'

/**
 * @class GAController
 * @desc Class required to manage google analytics 4
 * @export
 * @param {string} gaCode - Google Analytic 4 Measurement ID
 * @param {string} [options={}] - Custom analytic config options
 * @param {Array} gaCodes - Additional Measurement IDs
 *
 * @returns {GAController} GAController instance
 */
export class GAController {
  constructor(gaCode, config = {}, gaCodes = []) {
    this.config = config
    this.gaCode = gaCode
    this.extraGaCodes = gaCodes || []
    this.initialized = false
  }

  /**
   * Sets the singleton to initialized, and adds methods
   * @memberof GAController
   * @instance
   * @function
   * @private
   * @returns {GA4Singleton} GA4Singleton instance
   */
  setSingleton = () => {
    Object.assign(GA4Singleton, {
      initialized: true,
      pageView: this.pageView.bind(this),
      uaEvent: this.uaEvent.bind(this),
      event: this.event.bind(this),
      gtag: this.gtag.bind(this),
    })

    return GA4Singleton
  }

  /**
   * Builds the google analytics scripts tags
   * Then initializes and returns the GA4Singleton object
   * @memberof GAController
   * @instance
   * @function
   * @private
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
   * Shortcut helper so send a page view event
   * @function
   * @memberof GAController
   * @instance
   * @param {PageViewEvent} event
   *
   * @returns {*} Response from the global gtag method
   */
  pageView = ({ location = window.location, title = document.title }) => {
    const event = mapEventKeys({ location, title }, 'PAGE_VIEW')

    return this.gtag('event', 'page_view', event)
  }

  /**
   * Build a predefined event and send to gtag
   * @function
   * @memberof GAController
   * @instance
   * @param {UAEvent} event
   *
   * @returns {*} Response from the global gtag method
   */
  uaEvent = event => {
    const { action, ...eventData } = event
    const uaEvent = mapEventKeys(eventData, 'UA_EVENT_PROPS')

    return this.gtag('event', action, uaEvent)
  }

  /**
   * Build event and send to gtag
   * @function
   * @memberof GAController
   * @instance
   * @param {string} name - What the event should be called
   * @param {object} props - Key/values pairs of properties of the event
   *
   * @example
   * event({
   *   name: 'Button Click',
   *   time: new Date(),
   *   user: 'anon',
   * })
   *
   * @returns {*} Response from the global gtag method
   */
  event = (name, props) => {
    // TODO: getting an odd error with typeof
    // Can't use typeof name !== 'object' to validate the props
    // Need to investigate

    // Check if name is an object, which allows calling this method with just an object
    if (typeof name !== 'string' && !props) {
      props = name
      name = props.name
      delete props.name
    }

    // Validate the arguments are correct, else show a warning
    if (!name || typeof name !== 'string')
      return console.warn(
        `Invalid event arguments. Action name and properties are required!`
      )

    return this.gtag('event', name, props)
  }

  /**
   * Direct access to ga
   * @function
   * @memberof GAController
   * @instance
   * @param {Object} args - Arguments for the global ga method
   *
   * @returns {*} Response from the global ga method
   */
  ga = (...args) => window.ga(...args)

  /**
   * Direct access to gtag
   * @function
   * @memberof GAController
   * @instance
   * @param {Object} args - Arguments for the global gtag method
   *
   * @returns {*} Response from the global gtag method
   */
  gtag = (...args) => window.gtag(...args)
}

/**
 * Check if google analytics is initialized
 * @function
 * @memberof GAController
 * @static
 * @private
 *
 * @returns {boolean} - True if google analytics is initialized
 */
GAController.isInitialized = () => {
  return GA4Singleton.initialized
}

/**
 * Get RGA4 singleton instance if it's initialized
 * @function
 * @memberof GAController
 * @private
 * @static
 * @param {boolean} showWarn - Show warning when singleton is not initialized
 *
 * @returns {Object} - GA4Singleton
 */
GAController.getInstance = showWarn => {
  return GAController.isInitialized()
    ? GA4Singleton
    : showWarn && console.warn('Google Analytics is not initialized')
}
