/** @module Context */

import React, { useState, useEffect } from 'react'
import { RGA4Context } from './rga4Context'
import { GAController } from '../ga4/GAController'

/**
 * Initializes GA4, then injects the GA4Singleton into the children's props
 * @function
 * @private
 * @param {Object} props - Data to initialize Google Analytic 4
 * @param {string} props.code - Main Google Analytic Measurement ID
 * @param {Object} props.config - Config options for gtag method call
 * @param {Array} props.gaCodes - Extra GA4 Measurement ID's
 * @param {Array|Object} props.children - Children who will have the GA4 Singleton injected into their props
 * @param {function} setChildren - callback to update the passed in props.children
 *
 * @returns {void}
 */
const initializeGA4 = async (props, setRGA4) => {
  const { code, config, gaCodes } = props
  const GA4Instance = new GAController(code, config, gaCodes)
  const rga4 = await GA4Instance.initialize()
  setRGA4(rga4)
}

/**
 * @typedef RGA4Provider
 * @desc Context Provider used to set the Goggle Analytics Context.
 * @function
 * @param {Object} props - RGA4 provider props
 * @param {*} props.children - React Child components to wrap the with theme provider
 * @param {string} props.code - Google Analytics measurement ID to use for tracking
 * @param {Object} [props.config] - Custom Google Analytics config
 * @param {String[]} [props.gaCodes] - Extra google analytics
 * @export
 * @example
 * const App = () => {
 *   return (
 *     <RGA4Provider
 *       code={'Measurement-ID'}
 *       config={{ debug: true }}
 *     >
 *        <App />
 *     </RGA4Provider>
 *   )
 * }
 *
 * export default App
 *
 * @returns {Component|Object} - RGA4Provider.Provider - Provides RGA4 Singleton to the consumer
 */
export const RGA4Provider = ({ children, ...props }) => {
  const [rga4, setRGA4] = useState(GAController.getInstance())

  useEffect(() => {
    !GAController.isInitialized() && initializeGA4(props, setRGA4)
  }, [props, rga4, setRGA4])

  return <RGA4Context.Provider value={rga4}>{children}</RGA4Context.Provider>
}
