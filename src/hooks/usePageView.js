/** @module Hooks */

import { useEffect } from 'react'
import { GAController } from '../GAController'

/**
 * Fires a page view event when called
 * @function
 * @memberof Hooks
 * @private
 * @param {Object} options - Data for the page view event
 * @param {string} options.path - Current page path
 * @param {string} options.location - Current page location
 * @param {string} options.title - Current page title
 *
 * @returns {void}
 */
const isInitialized = ({ path, location, title }) => {
  const GA4 = GAController.getInstance()
  GA4 && GA4.pageview(path, location, title)
}

/**
 * Initializes GA4, then fires a page view event when called
 * @function
 * @memberof Hooks
 * @private
 * @param {Object} options - Data for the page view event
 * @param {string} options.path - Current page path
 * @param {string} options.location - Current page location
 * @param {string} options.title - Current page title
 * @param {string} options.gaCode - Google Analytic Measurement ID
 *
 * @returns {void}
 */
const initializeGA4 = ({ path, location, title, gaCode }) => {
  const ga4react = new GAController(gaCode)
  ga4react
    .initialize()
    .then(GA4 => {
      GA4.pageview(path, location, title)
    })
    .catch(err => {
      console.error(err)
    })
}

/**
 * Custom hook to initialized GA4, then fire a page view event
 * @function
 * @memberof Hooks
 * @export
 * @param {Object} options - Data for the page view event
 * @param {string} options.path - Current page path
 * @param {string} options.location - Current page location
 * @param {string} options.title - Current page title
 * @param {string} options.gaCode - Google Analytic Measurement ID
 *
 * @returns {void}
 */
export const usePageView = options =>
  useEffect(() => {
    GAController.isInitialized()
      ? isInitialized(options)
      : initializeGA4(options)
  })
