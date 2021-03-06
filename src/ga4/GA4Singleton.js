/**
 * @import {GA4Singleton} from '../../index.d.ts'
 */

import { buildScriptTags } from '../helpers/buildScriptTags'

/**
 * Sets the singleton to initialized, and adds methods
 * @function
 * @private
 * @param {string} override - Name of method that should be overwritten
 *
 * @returns {function} - Method to log an override error
 */
const noOpOverride = override => {
  return () => {
    console.error(
      `Method ${override} should be overwritten with GAController instance method!`
    )
  }
}

/**
 * @type {GA4Singleton}
 * @export
 * @private
 */
export const GA4Singleton = {
  initialized: false,
  gtag: noOpOverride('GAController#gtag'),
  uaEvent: noOpOverride('GAController#uaEvent'),
  pageView: noOpOverride('GAController#pageView'),
  event: noOpOverride('GAController#event'),
}
